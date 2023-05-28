import { useState, useEffect } from 'react';
import { categoriesWithSubcategories, Listing } from '../../types';
import Spinner from '../Spinner/Spinner';
import ListingCard from './ListingCard/ListingCard';
import { scrollToBottom } from '../../utils/helpers';
import useListing from '../../hooks/useListing';
import CatalogSidebarList from './CatalogSidebarList/CatalogSidebarList';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { getListings } from '../../api/listings';
import { Navigate } from 'react-router-dom';

export const Catalog = () => {
	const [maxLimit, setMaxLimit] = useState(20);

	const query = useQuery('listings', () => getListings(maxLimit));

	console.log(query.data);

	// useEffect(() => {
	// 	getListings(maxLimit)
	// 		.then(() => {
	// 			setIsLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }, [maxLimit, getListings]);

	const updateMaxLimit = () => {
		setMaxLimit((oldLimit) => oldLimit + 20);
		scrollToBottom();
	};

	if (query.isLoading) {
		return <Spinner />;
	}

	if (query.isError || !query.data) {
		return <Navigate to="/404" />;
	}

	return (
		<div className="w-4/5 pb-8">
			{query.data.listings.length ? (
				<>
					<h2 className="font-semibold text-2xl p-4 text-center">Latest listed</h2>
					<div className="flex gap-4 flex-wrap justify-center">
						{query.data.listings.map((x: Listing) => (
							<ListingCard key={x.id} listing={x} />
						))}
					</div>
					{query.data.totalListingCount > 20 && maxLimit + 20 < query.data.totalListingCount && (
						<div className="flex justify-center mt-4">
							<button className="text-lg text-orange-500 hover:text-orange-400" onClick={updateMaxLimit}>
								Show More
							</button>
						</div>
					)}
				</>
			) : (
				<h2 className="flex items-center justify-center text-2xl h-full">There are no listings yet.</h2>
			)}
		</div>
	);
};
