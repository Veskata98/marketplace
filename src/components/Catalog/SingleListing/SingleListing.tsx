import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Listing } from '../../../types';

const SingleListing = () => {
	const [listing, setListing] = useState<Listing>();

	const { listingId } = useParams();

	useEffect(() => {
		(async () => {
			if (listingId) {
				const docRef = doc(db, 'listings', listingId);
				const docSnap = await getDoc(docRef);
				setListing(docSnap.data() as Listing);
			}
		})();
	}, [listingId]);

	return <div>{listing?.title}</div>;
};

export default SingleListing;
