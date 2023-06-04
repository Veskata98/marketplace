import { FormEvent, useContext, useState, useEffect } from 'react';
import { ListingCardProps } from '../../../../types';

import defaultAvatar from '../../../../assets/images/defaultAvatar.png';
import { AuthContext } from '../../../../contexts/AuthContext';
import useMessage from '../../../../hooks/useMessage';

const ContactSellerPanel = ({ listing }: ListingCardProps) => {
	const [message, setMessage] = useState('');
	const [imageError, setImageError] = useState(false);
	const [isPossibleToSendMessage, setIsPossibleToSendMessage] = useState<Boolean>();

	const { user } = useContext(AuthContext);
	const { sendMessage, canSendMessage } = useMessage();

	const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (message) {
			sendMessage({ text: message, receiverId: listing.creatorId, listingId: listing.id }).then(() => {
				setIsPossibleToSendMessage(false);
				setMessage('');
			});
		}
	};

	const handleImageError = () => {
		setImageError(true);
	};

	useEffect(() => {
		canSendMessage(listing).then((data) => {
			setIsPossibleToSendMessage(data);
		});
	}, [listing, canSendMessage]);

	return (
		<div className="w-3/12 p-4 mt-10 bg-slate-200 rounded">
			<div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-4 mb-8">
				<h2 className="text-lg mb-2 text-center">Price</h2>
				<p className="text-2xl font-bold">$ {listing.price.toFixed(2)}</p>
			</div>
			<div>
				<h2 className="text-lg font-semibold mb-2 text-center">Contact Seller</h2>
				<div className="flex items-center">
					{imageError ? (
						<img
							src={defaultAvatar}
							alt={listing.creator!}
							className="w-10 h-10 rounded-full mr-4 shadow-md"
						/>
					) : (
						<img
							src={(listing.creatorAvatar as string) || defaultAvatar}
							alt={listing.creator!}
							className="w-10 h-10 rounded-full mr-4 shadow-md"
							onError={handleImageError}
						/>
					)}
					<div className="text-sm">
						<p className="text-gray-900 leading-none">{listing.creator}</p>
						<p className="text-gray-600">Creator</p>
					</div>
				</div>
			</div>
			{user &&
				listing.creatorId !== user?.uid &&
				(isPossibleToSendMessage ? (
					<form onSubmit={handleSendMessage} className="mt-4">
						<textarea
							className="w-full min-h-[200px] p-2 mb-2 border border-gray-300 rounded resize-y focus-visible:border-orange-500 focus-visible:border-2 focus-visible:outline-none"
							placeholder="Message to the seller..."
							name="messageText"
							onChange={(e) => setMessage(e.target.value)}
							value={message}></textarea>
						<button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600">
							Send Message
						</button>
					</form>
				) : (
					<span className="w-full flex justify-center mt-16 text-lg">Message sent to Seller!</span>
				))}
		</div>
	);
};

export default ContactSellerPanel;
