import {
	addDoc,
	deleteDoc,
	doc,
	getCountFromServer,
	getDocs,
	limit,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { db, storage } from '../config/firebase';

const useListing = () => {
	const [listings, setListings] = useState<Listing[]>();
	const [totalListingCount, setTotalListingCount] = useState(0);

	const { user } = useContext(AuthContext);

	const getListings = async (maxLimit: number) => {
		const result: Listing[] = [];
		const queryFromDB = query(listingsRef, orderBy('createdAt', 'desc'), limit(maxLimit));
		const queryCount = query(listingsRef);

		const querySnapshot = await getDocs(queryFromDB);
		const queryCountSnapshot = await getCountFromServer(queryCount);
		setTotalListingCount(queryCountSnapshot.data().count);

		querySnapshot.forEach(async (doc) => {
			const data = doc.data();
			data.id = doc.id;

			result.push(data as Listing);
		});

		setListings(result);
	};

	const addListing = async (listing: Listing, imageFile: File) => {
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

	return { listings, totalListingCount, getListings, addListing, editListing, removeListing };
};

export default useListing;
