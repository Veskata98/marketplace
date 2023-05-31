import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useQuery } from 'react-query';
import { getMessages } from '../../../api/messages';
import MessageCard from './MessageCard/MessageCard';
import Spinner from '../../Spinner/Spinner';

const Inbox = () => {
	const { user } = useContext(AuthContext);

	const { data, isLoading } = useQuery(['messages'], () => getMessages(user!.uid), { cacheTime: 0 });

	if (isLoading) {
		return (
			<div className="w-4/5 pb-8">
				<Spinner />
			</div>
		);
	}

	const unreadMessages = data?.receivedMessages.reduce((total, x) => {
		if (!x.isReceived) {
			total++;
		}
		return total;
	}, 0);

	return (
		<div className="flex w-2/3 justify-between p-4 text-center bg-gray-200 shadow-lg gap-10">
			<div className="w-1/2 px-8">
				{unreadMessages ? (
					<h2 className="mb-4 text-2xl font-bold text-red-500">{unreadMessages} new messages !</h2>
				) : (
					<h2 className="mb-4 text-2xl font-bold">No new messages</h2>
				)}

				<div className="flex flex-col gap-4">
					{data?.receivedMessages.length ? (
						data?.receivedMessages.map((message) => (
							<MessageCard key={message.id} message={message} isReceiver={true} />
						))
					) : (
						<h2 className="text-gray-500">There are no messages yet!</h2>
					)}
				</div>
			</div>
			<div className="w-1/2 px-8">
				<h2 className="mb-4 text-2xl font-bold text-black">Sent Messages</h2>
				<div className="flex flex-col gap-4">
					{data?.sentMessages.length ? (
						data?.sentMessages.map((message) => (
							<MessageCard key={message.id} message={message} isReceiver={false} />
						))
					) : (
						<h2 className="text-gray-500">You haven't sent any messages yet</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default Inbox;
