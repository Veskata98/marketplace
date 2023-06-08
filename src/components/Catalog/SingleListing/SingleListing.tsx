import { useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../../contexts/AuthContext';

import ContactSellerPanel from './ContactSellerPanel/ContactSellerPanel';
import { useQuery } from 'react-query';
import { getListing } from '../../../api/listings';
import SingleListingMainSection from './SingleListingMainSection/SingleListingMainSection';
import Spinner from '../../Spinner/Spinner';
import { Listing } from '../../../types';

const SingleListing = () => {
	const { user } = useContext(AuthContext);

	const { listingId } = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	const { data, isLoading, isError } = useQuery(['listing', listingId], () => getListing(listingId, user), {
		refetchOnMount: 'always',
	});

	if (isLoading) {
		return (
			<div className="flex gap-6 w-9/12 mb-16 relative">
				<Spinner />
			</div>
		);
	}

	if (isError) {
		return <Navigate to="/404" />;
	}

	return (
		<div className="flex gap-6 w-9/12 mb-16 relative">
			<button onClick={goBack} className="absolute top-2 left-12 hover:underline">
				<FontAwesomeIcon icon={faArrowLeftLong} /> Return to catalog
			</button>

			<SingleListingMainSection listing={data as Listing} />

			<ContactSellerPanel listing={data as Listing} />
		</div>
	);
};

export default SingleListing;
