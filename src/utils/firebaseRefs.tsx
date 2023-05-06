import { collection } from 'firebase/firestore';

import { db } from '../config/firebase';

export const listingsRef = collection(db, 'listings');
