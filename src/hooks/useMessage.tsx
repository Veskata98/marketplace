import { useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { Listing, Message } from '../types';

import { messagesRef } from '../utils/firebaseRefs';
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const useMessage = () => {
	const { user } = useContext(AuthContext);

	const sendMessage = async (message: Partial<Message>) => {
		if (!user) return false;

		await addDoc(messagesRef, {
			...message,
			createdAt: Date.now(),
			isReceived: false,
			sender: user.displayName,
			senderId: user.uid,
		});

		return true;
	};

	const setMessageAsSeen = async (message: Message) => {
		if (!user) return false;

		if (message.receiverId === user.uid && !message.isReceived) {
			const messageRef = doc(db, 'messages', message.id);
			await updateDoc(messageRef, { isReceived: true });
			return true;
		} else {
			return false;
		}
	};
	const canSendMessage = useCallback(
		async (listing: Listing) => {
			if (!user) return;

			if (user.uid === listing.creatorId) return;

			const queryString = query(
				messagesRef,
				where('senderId', '==', user.uid),
				where('listingId', '==', listing.id)
			);
			const snapshot = await getDocs(queryString);

			return snapshot.size === 0;
		},
		[user]
	);

	return { sendMessage, setMessageAsSeen, canSendMessage };
};

export default useMessage;
