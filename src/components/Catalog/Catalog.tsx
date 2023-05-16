import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCountFromServer, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { categoriesWithSubcategories, Listing } from '../../types';
import { listingsRef } from '../../utils/firebaseRefs';
import Spinner from '../Spinner/Spinner';
import ListingCard from './ListingCard/ListingCard';
import { scrollToBottom } from '../../utils/helpers';

export const Catalog = () => {
	const [latestListings, setLatestListings] = useState<Listing[]>([]);
	const [maxLimit, setMaxLimit] = useState(20);
	const [totalListingCount, setTotalListingCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const [isVisible, setIsVisible] = useState({
		electronics: false,
		vehicles: false,
		clothes: false,
		home: false,
		beauty: false,
		sports: false,
		toys: false,
		entertainment: false,
	});

	useEffect(() => {
		(async () => {
			const result: Listing[] = [];
			const queryFromDB = query(listingsRef, orderBy('createdAt', 'desc'), limit(maxLimit));
			const queryCount = query(listingsRef);

			const querySnapshot = await getDocs(queryFromDB);
			const queryCountSnapshot = await getCountFromServer(queryCount);
			setTotalListingCount(queryCountSnapshot.data().count);

			querySnapshot.forEach(async (doc) => {
				const data = doc.data();
				data.id = doc.id;

				result.push(data as Listing);
			});
			setLatestListings(result);
			setIsLoading(false);
		})();
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
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('electronics')}
						onMouseLeave={() => hideCategory('electronics')}>
						<Link to="/catalog/electronics" className={`${isVisible.electronics && 'text-orange-600'}`}>
							Electronics
						</Link>
						{isVisible.electronics && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['electronics'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/electronics/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('clothes')}
						onMouseLeave={() => hideCategory('clothes')}>
						<Link to="/catalog/clothes" className={`${isVisible.clothes && 'text-orange-600'}`}>
							Clothing and Accessories
						</Link>
						{isVisible.clothes && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['clothes'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/clothes/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('vehicles')}
						onMouseLeave={() => hideCategory('vehicles')}>
						<Link to="/catalog/vehicles" className={`${isVisible.vehicles && 'text-orange-600'}`}>
							Vehicles
						</Link>
						{isVisible.vehicles && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['vehicles'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/vehicles/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('home')}
						onMouseLeave={() => hideCategory('home')}>
						<Link to="/catalog/home" className={`${isVisible.home && 'text-orange-600'}`}>
							Home and Garden
						</Link>
						{isVisible.home && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['home'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/home/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('beauty')}
						onMouseLeave={() => hideCategory('beauty')}>
						<Link to="/catalog/beauty" className={`${isVisible.beauty && 'text-orange-600'}`}>
							Beauty and Personal Care
						</Link>
						{isVisible.beauty && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['beauty'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/beauty/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('sports')}
						onMouseLeave={() => hideCategory('sports')}>
						<Link to="/catalog/sports" className={`${isVisible.sports && 'text-orange-600'}`}>
							Sports and Outdoors
						</Link>
						{isVisible.sports && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['sports'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/sports/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('toys')}
						onMouseLeave={() => hideCategory('toys')}>
						<Link to="/catalog/toys" className={`${isVisible.toys && 'text-orange-600'}`}>
							Toys and Games
						</Link>
						{isVisible.toys && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['toys'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/toys/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 pl-4 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('entertainment')}
						onMouseLeave={() => hideCategory('entertainment')}>
						<Link to="/catalog/entertainment" className={`${isVisible.entertainment && 'text-orange-600'}`}>
							Books and Media
						</Link>
						{isVisible.entertainment && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								{Object.entries(categoriesWithSubcategories['entertainment'].subcategories).map((x) => (
									<Link
										key={x[0]}
										to={`/catalog/entertainment/${x[0]}`}
										className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
										{x[1]}
									</Link>
								))}
							</div>
						)}
					</li>
				</ul>
			</div>

			<div className="w-4/5 pb-8">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						{latestListings.length ? (
							<>
								<h2 className="font-semibold text-2xl p-4 text-center">Latest listed</h2>
								<div className="flex gap-4 flex-wrap justify-center">
									{latestListings.map((x: Listing) => (
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
