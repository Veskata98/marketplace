import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { Message } from '../types';

import { messagesRef } from '../utils/firebaseRefs';
import { addDoc } from 'firebase/firestore';

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

	return { sendMessage };
};

export default useMessage;
