import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Listing, Category } from '../../../types';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import { categoriesWithSubcategories } from '../../../utils/helpers';
import { CategoryWithSubcategories } from '../../../types';

const SingleListing = () => {
	const [listing, setListing] = useState<Listing>();
	const navigate = useNavigate();

	const { listingId } = useParams();

	useEffect(() => {
		(async () => {
			if (listingId) {
				const docRef = doc(db, 'listings', listingId);
				const docSnap = await getDoc(docRef);
				setListing(docSnap.data() as Listing);
			}
		})();
	}, [listingId]);

	const formattedDate = new Date(listing?.createdAt!).toLocaleDateString();

	return (
		<div className="flex gap-10 w-10/12 mb-16">
			<div className="w-3/4 mx-auto mt-10 p-4 bg-white rounded-lg overflow-hidden shadow-md">
				<img
					className="w-full h-80 object-contain object-center"
					src={listing?.imageUrl}
					alt={listing?.title}
				/>
				<div className="p-6">
					<h1 className="text-2xl font-bold mb-2 mt-4">{listing?.title}</h1>
					<p className="text-gray-700 text-base mb-4">
						{listing?.category && (
							<Link to={`/catalog/${listing.category}`} className="hover:text-orange-400">
								{listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
							</Link>
						)}{' '}
						{'>'}{' '}
						{listing?.subcategory && (
							<Link to={`/catalog/${listing.subcategory}`} className="hover:text-orange-400">
								{categoriesWithSubcategories[listing?.subcategory as keyof CategoryWithSubcategories]}
							</Link>
						)}
					</p>
					<p className="text-gray-700 text-base mb-4">${listing?.price.toFixed(2)}</p>
					<p className="text-gray-700 text-base mb-4">{listing?.description}</p>
					<p className="text-gray-600 text-sm">Created at: {formattedDate}</p>
				</div>
			</div>
			<div className="w-1/4">
				<div className=" mt-10">
					<h2 className="text-lg mb-4">Contact Seller</h2>
					<div className="flex items-center">
						<img
							className="w-10 h-10 rounded-full mr-4"
							src={listing?.creatorAvatar || defaultAvatar}
							alt="Creator Avatar"
						/>
						<div className="text-sm">
							<p className="text-gray-900 leading-none">{listing?.creator}</p>
							<p className="text-gray-600">Creator</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleListing;
