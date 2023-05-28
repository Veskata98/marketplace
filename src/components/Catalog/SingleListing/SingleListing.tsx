import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Listing, categoriesWithSubcategories } from '../../../types';

import useListing from '../../../hooks/useListing';
import { AuthContext } from '../../../contexts/AuthContext';

import brokenImg from '../../../assets/images/broken-img.png';

import Spinner from '../../Spinner/Spinner';
import { formatTimeToReadableString } from '../../../utils/helpers';
import ContactSellerPanel from './ContactSellerPanel/ContactSellerPanel';

const SingleListing = () => {
	const [listing, setListing] = useState<Listing>();
	const [imageError, setImageError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);

	const { getListing, removeListing } = useListing();

	const { listingId } = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (!listingId) {
			navigate('/404');
			return;
		}

		getListing(listingId)
			.then((data) => {
				setListing(data);
				setIsLoading(false);
			})
			.catch(() => {
				navigate('/404');
			});
	}, [listingId, getListing, navigate]);

	const handleImageError = () => {
		setImageError(true);
	};

	const handleListingDelete = async () => {
		const choice = window.confirm('Are you sure you want to delete this listing?');

		if (choice) {
			await removeListing(listing!);
			navigate('/');
		}
	};

	return (
		<div className="flex gap-6 w-9/12 mb-16">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className="w-8/12 mx-auto mt-10 p-4 bg-white rounded-lg overflow-hidden shadow-md relative">
						{imageError ? (
							<img
								src={brokenImg}
								alt={listing?.title}
								className="w-full object-cover border-b object-center rounded"
							/>
						) : (
							<img
								src={listing?.imageUrl as string}
								alt={listing?.title}
								className="w-full object-cover object-center rounded"
								style={{ height: '500px' }}
								onError={handleImageError}
							/>
						)}
						<button
							onClick={goBack}
							className="absolute rounded top-5 left-5 flex items-center justify-center bg-opacity-60 font-semibold gap-2 px-4 py-2 bg-orange-500 text-white shadow-inner hover:bg-opacity-80 hover:bg-orange-400 transition-colors">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<span>Back</span>
						</button>
						<div className="w-full bg-slate-200 rounded shadow p-2 mt-4 flex justify-between px-8">
							<span>Total views: {listing?.viewers?.length || 0}</span>
							{user && user.uid === listing?.creatorId && (
								<>
									<button onClick={() => navigate(`/listing/${listingId}/edit`, { replace: true })}>
										<FontAwesomeIcon icon={faPenToSquare} /> Edit
									</button>
									<button onClick={handleListingDelete}>
										<FontAwesomeIcon icon={faTrash} /> Delete
									</button>
								</>
							)}
						</div>
						<div className="px-6 pb-0 pt-2">
							<h1 className="text-2xl font-semibold mt-2">{listing?.title}</h1>
							<div className="text-gray-700 text-sm mb-4 italic">
								{listing?.category && typeof listing.category === 'string' && (
									<Link
										to={`/catalog/${listing.category}`}
										className="hover:text-orange-400 transition-colors">
										{categoriesWithSubcategories[listing.category].label}
									</Link>
								)}
								{listing?.subcategory && typeof listing.subcategory === 'string' && (
									<>
										<span className="mx-2">{'➜'}</span>
										<Link
											to={`/catalog/${listing.category}/${listing.subcategory}`}
											className="hover:text-orange-400 transition-colors">
											{
												categoriesWithSubcategories[listing.category].subcategories[
													listing.subcategory
												]
											}
										</Link>
									</>
								)}
							</div>

							<p className="shadow-inner bg-slate-100 min-h-[150px] rounded px-4 py-2 mb-4">
								{listing?.description}
							</p>
							<p className="text-gray-600 text-sm text-right">
								Created at: {formatTimeToReadableString(listing?.createdAt!)}
							</p>
						</div>
					</div>
					<ContactSellerPanel listing={listing!} />
				</>
			)}
		</div>
	);
};

export default SingleListing;
