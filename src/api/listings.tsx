import {
	arrayUnion,
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
import { Listing } from '../types';
import { listingsRef } from '../utils/firebaseRefs';
import { db } from '../config/firebase';
import { User } from 'firebase/auth';

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

export const getListing = async (listingId: string | undefined, user: User | null) => {
	if (!listingId) throw new Error('Listing ID missing!');

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
};

export const getMyListings = async (userId: string) => {
	const listings: Listing[] = [];
	const queryString = query(listingsRef, where('creatorId', '==', userId));
	const snapshot = await getDocs(queryString);

	snapshot.forEach((s) => listings.push({ ...(s.data() as Listing), id: s.id }));

	return listings;
};
