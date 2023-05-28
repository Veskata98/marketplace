import { Message } from '../types';

const useMessage = () => {
	const sendMessage = (message: Partial<Message>) => {
		console.log(message);
	};

	return { sendMessage };
};

export default useMessage;
