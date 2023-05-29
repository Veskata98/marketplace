import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { db, storage } from '../config/firebase';

const useListing = () => {
	const { user } = useContext(AuthContext);

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

	return { addListing, editListing, removeListing };
};

export default useListing;
