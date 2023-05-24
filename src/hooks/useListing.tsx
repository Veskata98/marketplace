import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { listingsRef } from '../utils/firebaseRefs';
import { db, storage } from '../config/firebase';

const useListing = () => {
	const { user } = useContext(AuthContext);

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

	const editListing = async (listing: Listing, editData: Partial<Listing>, imageFile?: File) => {
		if (!user || user.uid !== listing.creatorId) return;

		if (imageFile && imageFile.name) {
			const refToImageForDelete = ref(storage, `${listing.creatorId}/${listing.id}`);
			await deleteObject(refToImageForDelete);

			const storageRef = ref(storage, `${user.uid}/${listing.id}`);
			const uploadedImage = await uploadBytes(storageRef, imageFile);

			const docRef = doc(db, `/listings/${listing.id}`);

			const url = await getDownloadURL(uploadedImage.ref);
			await updateDoc(docRef, { imageUrl: url });
		}
	};

	return { addListing, editListing };
};

export default useListing;
