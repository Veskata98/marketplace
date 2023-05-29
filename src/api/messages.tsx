import React from 'react';
import { Message } from '../types';
import { getDocs, query, where } from 'firebase/firestore';
import { messagesRef } from '../utils/firebaseRefs';

export const getMessages = async (userId: string) => {
	const result: Message[] = [];

	const queryString = query(messagesRef, where('receiverId', '==', userId));
	const querySnapshot = await getDocs(queryString);

	querySnapshot.forEach(async (doc) => {
		result.push(doc.data() as Message);
	});

	return result;
};
