import { Message } from '../types';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { messagesRef } from '../utils/firebaseRefs';
import { db } from '../config/firebase';

export const getMessages = async (userId: string) => {
	if (!userId) {
		throw new Error('User Not Provided!');
	}
	const sentMessages: Message[] = [];
	const receivedMessages: Message[] = [];

	const queryStringSent = query(messagesRef, where('senderId', '==', userId));
	const querySnapshotSent = await getDocs(queryStringSent);

	const queryStringReceived = query(messagesRef, where('receiverId', '==', userId));
	const querySnapshotReceived = await getDocs(queryStringReceived);

	querySnapshotSent.forEach(async (doc) => {
		const id = doc.id;
		sentMessages.push({ ...doc.data(), id } as Message);
	});

	querySnapshotReceived.forEach(async (doc) => {
		const id = doc.id;
		receivedMessages.push({ ...doc.data(), id } as Message);
	});

	return { sentMessages, receivedMessages };
};

export const getMessage = async (messageId: string) => {
	if (!messageId) throw new Error('Message ID missing!');
	const docRef = doc(db, 'messages', messageId!);

	const snapshot = await getDoc(docRef);

	if (!snapshot.data()) throw new Error();
	const message = snapshot.data() as Message;
	message.id = snapshot.id;

	return message;
};

export const getMessageNotifications = async (userId: string) => {
	let newNotifications = 0;
	const queryString = query(messagesRef, where('receiverId', '==', userId), where('isReceived', '==', false));
	const snapshot = await getDocs(queryString);

	newNotifications = snapshot.size;

	return newNotifications;
};
