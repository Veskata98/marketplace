import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Listing, categoriesWithSubcategories } from '../../../types';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import brokenImg from '../../../assets/images/broken-img.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const SingleListing = () => {
	const [listing, setListing] = useState<Listing>();
	const { user } = useContext(AuthContext);
	// const navigate = useNavigate();

	const { listingId } = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

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
			<div className="w-3/4 mx-auto mt-10 p-4 bg-white rounded-lg overflow-hidden shadow-md relative">
				<img
					className="w-full h-80 object-contain object-center "
					src={listing?.imageUrl || brokenImg}
					alt={listing?.title}
				/>
				<button
					onClick={goBack}
					className="absolute top-5 left-5 p-2 bg-orange-300 text-black rounded px-4 shadow-lg hover:bg-orange-200 transition-all">
					Back
				</button>
				<div className="p-6">
					<h1 className="text-2xl font-bold mb-2 mt-4">{listing?.title}</h1>
					<p className="text-gray-700 text-base mb-4">
						{listing?.category && typeof listing.category === 'string' && (
							<Link to={`/catalog/${listing.category}`} className="hover:text-orange-400">
								{categoriesWithSubcategories[listing.category].label}
							</Link>
						)}
						<span className="mx-2">{'➜'}</span>
						{typeof listing?.subcategory === 'string' && (
							<Link
								to={`/catalog/${listing.category}/${listing.subcategory}`}
								className="hover:text-orange-400">
								{categoriesWithSubcategories[listing.category].subcategories[listing.subcategory]}
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
				{user && (listing?.creatorId === user?.uid ? <div>Is Owner</div> : <div>Not Owner</div>)}
			</div>
		</div>
	);
};

export default SingleListing;
