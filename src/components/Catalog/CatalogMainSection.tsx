import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Listing } from '../../types';

import ListingCard from './ListingCard/ListingCard';
import Spinner from '../Spinner/Spinner';
import { scrollToBottom } from '../../utils/helpers';
import { getListings } from '../../api/listings';

type CatalogMainSectionProps = {
	category?: string;
	subcategory?: string;
};

export const CatalogMainSection = ({ category, subcategory }: CatalogMainSectionProps) => {
	const [maxLimit, setMaxLimit] = useState(20);

	const { data, isError, isLoading } = useQuery('listings', () => getListings(maxLimit, category, subcategory), {
		staleTime: 5 * (60 * 1000),
	});

	if (isLoading) {
		return <Spinner />;
	}

	if (isError || !data) {
		return <Navigate to="/404" />;
	}

	if (data.listings.length === 0) {
		return <h2 className="flex items-center justify-center text-2xl h-full">There are no listings yet.</h2>;
	}

	const updateMaxLimit = () => {
		setMaxLimit((oldLimit) => oldLimit + 20);
		scrollToBottom();
	};

	const canExpandListings = () => data.totalListingCount > 20 && maxLimit + 20 < data.totalListingCount;

	return (
		<>
			<h2 className="font-semibold text-2xl p-4 text-center">Latest listed</h2>
			<div className="flex gap-4 flex-wrap justify-center">
				{data.listings.map((x: Listing) => (
					<ListingCard key={x.id} listing={x} />
				))}
			</div>
			{canExpandListings() && (
				<div className="flex justify-center mt-4">
					<button className="text-lg text-orange-500 hover:text-orange-400" onClick={updateMaxLimit}>
						Show More
					</button>
				</div>
			)}
		</>
	);
};
