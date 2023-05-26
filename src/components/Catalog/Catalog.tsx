import { useState, useEffect } from 'react';
import { categoriesWithSubcategories, Listing } from '../../types';
import Spinner from '../Spinner/Spinner';
import ListingCard from './ListingCard/ListingCard';
import { scrollToBottom } from '../../utils/helpers';
import useListing from '../../hooks/useListing';
import CatalogSidebarList from './CatalogSidebarList/CatalogSidebarList';

export const Catalog = () => {
	const [maxLimit, setMaxLimit] = useState(20);
	const [isLoading, setIsLoading] = useState(true);

	const { listings, totalListingCount, getListings } = useListing();

	const [isVisible, setIsVisible] = useState(
		Object.keys(categoriesWithSubcategories).reduce((acc, x) => ({ ...acc, [x]: false }), {})
	);

	useEffect(() => {
		getListings(maxLimit)
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maxLimit]);

	const showCategory = (category: keyof typeof categoriesWithSubcategories) => {
		setIsVisible((state) => ({
			...state,
			[category]: true,
		}));
	};

	const hideCategory = (category: keyof typeof categoriesWithSubcategories) => {
		setIsVisible((state) => ({
			...state,
			[category]: false,
		}));
	};

	const updateMaxLimit = () => {
		setMaxLimit((oldLimit) => oldLimit + 20);
		scrollToBottom();
	};

	return (
		<div className="flex gap-4 justify-between w-10/12">
			<div className="w-1/5 bg-slate-200 pt-2">
				<h2 className="text-xl font-bold mb-4 text-center">Categories</h2>
				<ul className="flex flex-col gap-1 align-middle">
					{Object.keys(categoriesWithSubcategories).map((x) => (
						<CatalogSidebarList
							category={x}
							showCategory={showCategory}
							hideCategory={hideCategory}
							isVisible={isVisible[x as keyof typeof isVisible]}
						/>
					))}
				</ul>
			</div>

			<div className="w-4/5 pb-8">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						{listings?.length ? (
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
