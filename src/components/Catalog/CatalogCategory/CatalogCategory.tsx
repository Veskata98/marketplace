import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { scrollToBottom } from '../../../utils/helpers';
import { categoriesWithSubcategories, Listing } from '../../../types';

import Spinner from '../../Spinner/Spinner';
import ListingCard from '../ListingCard/ListingCard';
import useListing from '../../../hooks/useListing';

const CatalogCategory = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [maxLimit, setMaxLimit] = useState(20);

	const { category, subcategory } = useParams<{ category: string; subcategory: string }>();

	const { listings, totalListingCount, getListings } = useListing();

	useEffect(() => {
		getListings(maxLimit, category, subcategory)
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [maxLimit, category, subcategory, getListings]);

	const updateMaxLimit = () => {
		setMaxLimit((oldLimit) => oldLimit + 20);
		scrollToBottom();
	};

	return (
		<div className="flex gap-4 justify-between w-10/12">
			<div className="w-1/5 bg-slate-200 pt-2">
				<h2 className="text-xl font-bold mb-4 text-center">
					{category &&
						(subcategory
							? categoriesWithSubcategories[category].subcategories[subcategory]
							: categoriesWithSubcategories[category].label)}
				</h2>
				{!subcategory && category && (
					<ul className="flex flex-col gap-1 align-middle">
						{Object.entries(categoriesWithSubcategories[category].subcategories).map((x) => (
							<li
								key={x[0]}
								className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300">
								<Link to={`/catalog/${category}/${x[0]}`} className="hover:text-orange-500">
									{x[1]}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="w-4/5 pb-8 relative">
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
								{totalListingCount > 20 && maxLimit + 20 < totalListingCount && (
									<div className="flex justify-center mt-4">
										<button
											className="text-lg text-orange-500 hover:text-orange-400"
											onClick={updateMaxLimit}>
											Show More
										</button>
									</div>
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
