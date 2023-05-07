import { useState } from 'react';
import { Listing } from '../../../types';

import brokenImg from '../../../assets/images/broken-img.png';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../../utils/helpers';

type ListingCardProps = {
	listing: Listing;
};

const ListingCard = ({ listing }: ListingCardProps) => {
	const [imageError, setImageError] = useState(false);
	const formattedDate = new Date(listing.createdAt ?? Date.now()).toLocaleDateString();

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<Link to={`/catalog/listing/${listing.id}`}>
			<div className="bg-white rounded-md shadow-md overflow-hidden w-72">
				{imageError ? (
					<img src={brokenImg} alt={listing.title} className="w-full h-48 object-cover border-b" />
				) : (
					<img
						src={listing.imageUrl}
						alt={listing.title}
						className="w-full h-48 object-contain border-b"
						onError={handleImageError}
					/>
				)}
				<div className="p-4">
					<h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
					<p className="text-gray-600 text-sm mb-2">${listing.price}</p>
					<p className="text-gray-600 text-sm mb-2">
						{listing.subcategory && CATEGORIES[listing.subcategory]}
					</p>
					<p className="text-gray-500 text-sm">{formattedDate}</p>
				</div>
			</div>
		</Link>
	);
};

export default ListingCard;
