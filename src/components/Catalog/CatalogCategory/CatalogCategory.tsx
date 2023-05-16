import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountFromServer, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

import { categoriesWithSubcategories, scrollToBottom } from '../../../utils/helpers';
import { CategoryWithSubcategories, Listing } from '../../../types';

import Spinner from '../../Spinner/Spinner';
import { listingsRef } from '../../../utils/firebaseRefs';
import ListingCard from '../ListingCard/ListingCard';

const CatalogCategory = () => {
	const [listings, setListings] = useState<Listing[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [maxLimit, setMaxLimit] = useState(20);
	const [totalListingCount, setTotalListingCount] = useState(0);

	const { category } = useParams<{ category: string }>();

	useEffect(() => {
		(async () => {
			const result: Listing[] = [];
			const queryFromDB = query(
				listingsRef,
				where('subcategory', '==', category),
				orderBy('createdAt', 'desc'),
				limit(maxLimit)
			);
			const queryCount = query(listingsRef);

			const querySnapshot = await getDocs(queryFromDB);
			const queryCountSnapshot = await getCountFromServer(queryCount);
			setTotalListingCount(queryCountSnapshot.data().count);

			querySnapshot.forEach(async (doc) => {
				const data = doc.data();
				data.id = doc.id;

				result.push(data as Listing);
			});
			setListings(result);
			setIsLoading(false);
		})();
	}, [maxLimit, category]);

	const updateMaxLimit = () => {
		setMaxLimit((oldLimit) => oldLimit + 20);
		scrollToBottom();
	};

	return (
		<div className="flex gap-4 justify-between w-10/12">
			<div className="w-1/5 bg-slate-200 pt-2">
				<h2 className="text-xl font-bold mb-4 text-center">
					{category && categoriesWithSubcategories[category as keyof CategoryWithSubcategories]}
				</h2>
			</div>
			<div className="w-4/5 pb-16 relative">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<Link to="/" className="absolute text-lg p-4 right-0 hover:text-orange-400">
							Back
						</Link>
						{listings.length ? (
							<>
								<h2 className="font-semibold text-2xl p-4 text-center">Latest listed</h2>
								<div className="flex gap-4 flex-wrap justify-center">
									{listings.map((x: Listing) => (
										<ListingCard key={x.id} listing={x} />
									))}
								</div>
								{totalListingCount > 20 && (
									<button className="text-lg" onClick={updateMaxLimit}>
										Show More
									</button>
								)}
							</>
						) : (
							<h2 className="flex items-center justify-center text-2xl h-full">
								There are no listings yet.
							</h2>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default CatalogCategory;
