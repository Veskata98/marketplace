import { addDoc, collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Listing } from '../types';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const useListing = () => {
	const listingsRef = collection(db, 'listings');
	const usersRef = collection(db, 'users');

	const { user } = useContext(AuthContext);

	const getLatest = async () => {
		const result = query(listingsRef, orderBy('title'));

		const querySnapshot = await getDocs(result);
		querySnapshot.forEach(async (doc) => {
			const creatorId = doc.get('creatorId');

			console.log(await getDocs(usersRef));

			// console.log(doc.id, ' => ', doc.data());
		});
	};

	const addListing = async (listing: Listing) => {
		if (user) {
			const creator = doc(db, 'users', user.uid);

			await addDoc(listingsRef, {
				...listing,
				creatorId: creator,
				createdAt: new Date(),
				modifiedAt: null,
			});
		}
	};

	return { getLatest, addListing };
};

export default useListing;
