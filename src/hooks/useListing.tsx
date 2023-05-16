import { addDoc } from 'firebase/firestore';
import { Listing } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { listingsRef } from '../utils/firebaseRefs';

const useListing = () => {
	const { user } = useContext(AuthContext);

	const addListing = async (listing: Listing) => {
		if (user) {
			await addDoc(listingsRef, {
				...listing,
				createdAt: Date.now(),
				modifiedAt: null,
			});
		}
	};

	return { listingsRef, addListing };
};

export default useListing;
