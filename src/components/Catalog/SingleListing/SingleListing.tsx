import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Listing, categoriesWithSubcategories } from '../../../types';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import brokenImg from '../../../assets/images/broken-img.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Spinner from '../../Spinner/Spinner';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const SingleListing = () => {
	const [listing, setListing] = useState<Listing>();
	const [imageError, setImageError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);

	const { listingId } = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		try {
			const docRef = doc(db, 'listings', listingId!);

			getDoc(docRef)
				.then(async (snapshot) => {
					if (!snapshot.data()) throw new Error();
					const listingData = snapshot.data() as Listing;

					if (user && !listingData.viewers.includes(user.uid) && user.uid !== listingData.creatorId) {
						await updateDoc(docRef, { viewers: arrayUnion(user.uid) });
					}

					setListing(listingData);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error(error);
					navigate('/404');
				});
		} catch (error) {
			console.error(error);
			navigate('/404');
		}
	}, [listingId, navigate, user]);

	const handleImageError = () => {
		setImageError(true);
	};

	const formattedDate = moment(listing?.createdAt).format('h:mm:ss, DD MMMM YYYY');

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
								className="w-full h-96 object-cover border-b p-2 object-center rounded"
							/>
						) : (
							<img
								src={listing?.imageUrl as string}
								alt={listing?.title}
								className="w-full h-96 object-cover object-center rounded"
								onError={handleImageError}
							/>
						)}
						<button
							onClick={goBack}
							className="absolute top-5 left-5 flex items-center justify-center bg-opacity-20 font-semibold gap-2 px-4 py-2 bg-orange-300 text-black shadow-lg hover:bg-opacity-20 hover:text-white hover:bg-orange-400 transition-colors">
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
								<button onClick={() => navigate(`/listing/${listingId}/edit`)}>
									<FontAwesomeIcon icon={faPenToSquare} /> Edit
								</button>
							)}
						</div>
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
										{
											categoriesWithSubcategories[listing.category].subcategories[
												listing.subcategory
											]
										}
									</Link>
								)}
							</p>
							<p className="text-gray-700 text-base mb-4">${listing?.price?.toFixed(2)}</p>
							<p className="text-gray-700 text-base mb-4">{listing?.description}</p>
							<p className="text-gray-600 text-sm">Created at: {formattedDate}</p>
						</div>
					</div>
					<div className="w-3/12 p-4 mt-10">
						<div className="">
							<h2 className="text-lg mb-2">Contact Seller</h2>
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
				</>
			)}
		</div>
	);
};

export default SingleListing;
