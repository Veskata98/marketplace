import {
	addDoc,
	arrayUnion,
	deleteDoc,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState, useCallback } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { db, storage } from '../config/firebase';

const useListing = () => {
	const [listings, setListings] = useState<Listing[]>([]);
	const [totalListingCount, setTotalListingCount] = useState(0);

	const { user } = useContext(AuthContext);

	const getListing = useCallback(
		async (listingId: string) => {
			try {
				let listing;
				const docRef = doc(db, 'listings', listingId!);

				const snapshot = await getDoc(docRef);

				if (!snapshot.data()) throw new Error();
				const listingData = snapshot.data() as Listing;

				if (user && !listingData.viewers.includes(user.uid) && user.uid !== listingData.creatorId) {
					await updateDoc(docRef, { viewers: arrayUnion(user.uid) });
				}

				listing = { ...listingData, id: listingId };
				return listing;
			} catch (error) {
				throw new Error('Something went wrong!');
			}
		},
		[user]
	);

	const getListings = useCallback(async (maxLimit: number, category?: string, subcategory?: string) => {
		const result: Listing[] = [];

		let queryFromDB;
		let queryCount;

		if (subcategory) {
			queryFromDB = query(
				listingsRef,
				where('subcategory', '==', subcategory),
				orderBy('createdAt', 'desc'),
				limit(maxLimit)
			);
			queryCount = query(listingsRef, where('subcategory', '==', subcategory));
		} else if (category) {
			queryFromDB = query(
				listingsRef,
				where('category', '==', category),
				orderBy('createdAt', 'desc'),
				limit(maxLimit)
			);
			queryCount = query(listingsRef, where('category', '==', category));
		} else {
			queryFromDB = query(listingsRef, orderBy('createdAt', 'desc'), limit(maxLimit));
			queryCount = query(listingsRef);
		}

		const querySnapshot = await getDocs(queryFromDB);
		const queryCountSnapshot = await getCountFromServer(queryCount);
		setTotalListingCount(queryCountSnapshot.data().count);

		querySnapshot.forEach(async (doc) => {
			const data = doc.data();
			data.id = doc.id;

			result.push(data as Listing);
		});

		setListings(result);
	}, []);

	const addListing = async (listing: Partial<Listing>, imageFile: File) => {
		if (!user) return;

		const resultRef = await addDoc(listingsRef, {
			...listing,
			createdAt: Date.now(),
			modifiedAt: null,
		});

		const storageRef = ref(storage, `${user.uid}/${resultRef.id}`);
		const uploadedImage = await uploadBytes(storageRef, imageFile);

		const url = await getDownloadURL(uploadedImage.ref);
		await updateDoc(resultRef, { imageUrl: url });
	};

	const editListing = async (listing: Partial<Listing>, imageFile?: File) => {
		if (!user || user.uid !== listing.creatorId) return;

		const docRef = doc(db, `listings/${listing.id}`);
		let newImageUrl = null;

		if (imageFile && imageFile.name) {
			const refToImageForDelete = ref(storage, `${listing.creatorId}/${listing.id}`);
			await deleteObject(refToImageForDelete);

			const storageRef = ref(storage, `${user.uid}/${listing.id}`);
			const uploadedImage = await uploadBytes(storageRef, imageFile);

			newImageUrl = await getDownloadURL(uploadedImage.ref);
		}

		if (newImageUrl) {
			await updateDoc(docRef, { ...listing, imageUrl: newImageUrl });
		} else {
			await updateDoc(docRef, { ...listing });
		}
	};

	const removeListing = async (listing: Listing) => {
		if (!user || user.uid !== listing.creatorId) return;

		const docRef = doc(db, `listings/${listing.id}`);
		await deleteDoc(docRef);

		const listingImageRef = ref(storage, `${user.uid}/${listing.id}`);
		await deleteObject(listingImageRef);
	};

	return { listings, totalListingCount, getListings, getListing, addListing, editListing, removeListing };
};

export default useListing;
