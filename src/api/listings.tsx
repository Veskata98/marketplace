import { getCountFromServer, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { Listing } from '../types';
import { listingsRef } from '../utils/firebaseRefs';

export const getListings = async (maxLimit: number, category?: string, subcategory?: string) => {
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

	querySnapshot.forEach(async (doc) => {
		const data = doc.data();
		data.id = doc.id;

		result.push(data as Listing);
	});

	return { listings: result, totalListingCount: queryCountSnapshot.data().count };
};
