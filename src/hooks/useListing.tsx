import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { db, storage } from '../config/firebase';

const useListing = () => {
	const { user } = useContext(AuthContext);

	const getListing = async (listingId: string) => {
		const docRef = doc(db, 'listings', listingId);
		const docSnap = await getDoc(docRef);

		return docSnap.data() as Listing;
	};

	const addListing = async (listing: Listing, imageFile: File) => {
		if (!user) return;

		const resultDoc = await addDoc(listingsRef, {
			...listing,
			createdAt: Date.now(),
			modifiedAt: null,
		});

		const storageRef = ref(storage, `${user.uid}/${resultDoc.id}`);
		const uploadedImage = await uploadBytes(storageRef, imageFile);

		const url = await getDownloadURL(uploadedImage.ref);
		await updateDoc(resultDoc, { imageUrl: url });
	};

	const editListing = async (listing: Listing, editData: Partial<Listing>) => {
		if (!user || user.uid !== listing.creatorId) return;

		console.log(1);
	};

	return { getListing, addListing, editListing };
};

export default useListing;
