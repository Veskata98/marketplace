import { addDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { storage } from '../config/firebase';

const useListing = () => {
	const { user } = useContext(AuthContext);

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

	return { addListing };
};

export default useListing;
