import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import brokenImg from '../../../../assets/images/broken-img.png';
import { ListingCardProps, categoriesWithSubcategories } from '../../../../types';
import { Link, useNavigate } from 'react-router-dom';
import useListing from '../../../../hooks/useListing';
import { formatTimeToReadableString } from '../../../../utils/helpers';
import { AuthContext } from '../../../../contexts/AuthContext';

const SingleListingMainSection = ({ listing }: ListingCardProps) => {
	const [imageError, setImageError] = useState(false);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const { removeListing } = useListing();

	const handleImageError = () => {
		setImageError(true);
	};

	const handleListingDelete = async () => {
		const choice = window.confirm('Are you sure you want to delete this listing?');

		if (choice) {
			await removeListing(listing);
			navigate('/');
		}
	};

	return (
		<div className="w-8/12 mx-auto mt-10 p-4 bg-white rounded-lg overflow-hidden shadow-md relative">
			{imageError ? (
				<img
					src={brokenImg}
					alt={listing.title}
					className="w-full object-cover border-b object-center rounded"
				/>
			) : (
				<img
					src={listing.imageUrl as string}
					alt={listing.title}
					className="w-full object-cover object-center rounded"
					style={{ height: '500px' }}
					onError={handleImageError}
				/>
			)}
			<div className="w-full bg-slate-200 rounded shadow p-2 mt-4 flex justify-between px-8">
				<span>Total views: {listing.viewers?.length || 0}</span>
				{user && user.uid === listing.creatorId && (
					<>
						<button onClick={() => navigate(`/listing/${listing.id}/edit`, { replace: true })}>
							<FontAwesomeIcon icon={faPenToSquare} /> Edit
						</button>
						<button onClick={handleListingDelete}>
							<FontAwesomeIcon icon={faTrash} /> Delete
						</button>
					</>
				)}
			</div>
			<div className="px-6 pb-0 pt-2">
				<h1 className="text-2xl font-semibold mt-2">{listing.title}</h1>
				<div className="text-gray-700 text-sm mb-4 italic">
					{listing.category && typeof listing.category === 'string' && (
						<Link to={`/catalog/${listing.category}`} className="hover:text-orange-400 transition-colors">
							{categoriesWithSubcategories[listing.category].label}
						</Link>
					)}
					{listing.subcategory && typeof listing.subcategory === 'string' && (
						<>
							<span className="mx-2">{'➜'}</span>
							<Link
								to={`/catalog/${listing.category}/${listing.subcategory}`}
								className="hover:text-orange-400 transition-colors">
								{categoriesWithSubcategories[listing.category].subcategories[listing.subcategory]}
							</Link>
						</>
					)}
				</div>

				<p className="shadow-inner bg-slate-100 min-h-[150px] rounded px-4 py-2 mb-4">{listing.description}</p>
				<p className="text-gray-600 text-sm text-right">
					Created at: {formatTimeToReadableString(listing.createdAt!)}
				</p>
			</div>
		</div>
	);
};

export default SingleListingMainSection;
