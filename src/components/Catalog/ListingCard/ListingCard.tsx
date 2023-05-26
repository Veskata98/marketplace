import { useState } from 'react';
import moment from 'moment';
import { categoriesWithSubcategories, ListingCardProps } from '../../../types';

import brokenImg from '../../../assets/images/broken-img.png';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }: ListingCardProps) => {
	const [imageError, setImageError] = useState(false);

	const formattedDate = moment(listing.createdAt).fromNow();

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<Link to={`/catalog/${listing.category}/${listing.subcategory}/${listing.id}`}>
			<div className="bg-white rounded-md shadow-md overflow-hidden w-72">
				{imageError ? (
					<img src={brokenImg} alt={listing.title} className="w-full h-48 object-cover border-b p-2" />
				) : (
					<img
						src={listing.imageUrl}
						alt={listing.title}
						className="w-full h-48 object-cover border-b"
						onError={handleImageError}
					/>
				)}
				<div className="p-4 bg-gray-100 rounded-lg shadow-md">
					<h3 className="text-xl font-bold mb-2 text-gray-800">{listing.title}</h3>
					<p className="text-gray-600 text-lg mb-1">$ {listing.price.toFixed(2)}</p>
					<p className="text-gray-600 text-sm mb-2 capitalize">
						{categoriesWithSubcategories[listing.category].subcategories[listing.subcategory]}
					</p>
					<p className="text-gray-500 text-sm">{formattedDate}</p>
				</div>
			</div>
		</Link>
	);
};

export default ListingCard;
