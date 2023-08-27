import { Link } from 'react-router-dom';

import { Message } from '../../../../types';
import { useQuery } from 'react-query';
import { getListing } from '../../../../api/listings';
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { formatTimeToRelative } from '../../../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

type MessageCardProps = {
	message: Message;
	isReceiver: boolean;
};

const MessageCard = ({ message: m, isReceiver }: MessageCardProps) => {
	const { user } = useContext(AuthContext);

	const truncatedText = m.text.length > 50 ? `${m.text.substring(0, 50)}...` : m.text;

	const { data } = useQuery(['listing', m.listingId], () => getListing(m.listingId, user));

	return (
		<Link to={`/messages/${m.id}`} className="block p-4 rounded shadow-md relative h-28 back">
			<img
				className="absolute top-0 left-0 w-full h-full object-cover opacity-70 rounded-lg"
				style={{ filter: 'brightness(20%)' }}
				src={data?.imageUrl}
				alt={data?.title}
			/>
			<div className="relative z-10">
				<div className="flex justify-between items-center mb-2 text-white after:">
					<p className="text-white font-semibold text-lg flex align-middle gap-2 items-center">
						{isReceiver && !m.isReceived && (
							<FontAwesomeIcon
								className="text-red-500 text-2xl bg-black rounded-full"
								icon={faCircleExclamation}
							/>
						)}
						{data?.title}
					</p>
					<p className=" text-sm">{formatTimeToRelative(m.createdAt)}</p>
				</div>
				<p className="text-white truncate text-sm">{truncatedText}</p>
			</div>
		</Link>
	);
};

export default MessageCard;
