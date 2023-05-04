import { useState } from 'react';
import { CatalogCategories } from '../../interfaces';
import { Link } from 'react-router-dom';

export const Catalog = () => {
	const [isVisible, setIsVisible] = useState<CatalogCategories>({
		electronics: false,
		vehicles: false,
		clothes: false,
		home: false,
		beauty: false,
		sports: false,
		toys: false,
		entertainment: false,
	});

	const showCategory = (category: keyof CatalogCategories) => {
		setIsVisible((state) => ({
			...state,
			[category]: true,
		}));
	};

	const hideCategory = (category: keyof CatalogCategories) => {
		setIsVisible((state) => ({
			...state,
			[category]: false,
		}));
	};

	return (
		<div className="flex gap-4 justify-between w-10/12">
			<div className="w-1/5 bg-slate-200 pt-2">
				<h2 className="text-xl font-bold mb-4 text-center">Categories</h2>
				<ul className="flex flex-col gap-1 align-middle">
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('electronics')}
						onMouseLeave={() => hideCategory('electronics')}>
						<Link to="/electronics" className={`${isVisible.electronics && 'text-orange-600'}`}>
							Electronics
						</Link>
						{isVisible.electronics && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/computers"
									className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8">
									Computers
								</Link>
								<Link
									className="hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/phones">
									Phones and Accessories
								</Link>
								<Link
									className="hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/audio-and-video">
									Audio and Video
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-slate-400 p-4 px-8"
									to="/catalog/games">
									Gaming
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('clothes')}
						onMouseLeave={() => hideCategory('clothes')}>
						<Link to="/electronics" className={`${isVisible.clothes && 'text-orange-600'}`}>
							Clothing and Accessories
						</Link>
						{isVisible.clothes && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/clothing-men"
									className="hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Men's clothing
								</Link>
								<Link
									className="hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/clothing-women">
									Women's clothing
								</Link>
								<Link
									className="hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/clothing-kids">
									Kid's clothing
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/shoes">
									Shoes
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 p-4 px-8"
									to="/catalog/accessories">
									Accessories
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('vehicles')}
						onMouseLeave={() => hideCategory('vehicles')}>
						<Link to="/electronics" className={`${isVisible.vehicles && 'text-orange-600'}`}>
							Vehicles
						</Link>
						{isVisible.vehicles && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/cars"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Cars
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/motorcycles">
									Motorcycles
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/trucks">
									Trucks
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/boats">
									Boats
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 p-4 px-8"
									to="/catalog/other-vehicles">
									Other vehicles
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('home')}
						onMouseLeave={() => hideCategory('home')}>
						<Link to="/electronics" className={`${isVisible.home && 'text-orange-600'}`}>
							Home and Garden
						</Link>
						{isVisible.home && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/furniture"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Furniture
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/decor">
									Decor
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/appliances">
									Appliances
								</Link>
								<Link className="flex items-center hover:text-orange-600 p-4 px-8" to="/catalog/tools">
									Tools
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('beauty')}
						onMouseLeave={() => hideCategory('beauty')}>
						<Link to="/electronics" className={`${isVisible.beauty && 'text-orange-600'}`}>
							Beauty and Personal Care
						</Link>
						{isVisible.beauty && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/makeup"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Makeup
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/skincare">
									Skincare
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/haircare">
									Haircare
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 p-4 px-8"
									to="/catalog/grooming">
									Grooming
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('sports')}
						onMouseLeave={() => hideCategory('sports')}>
						<Link to="/electronics" className={`${isVisible.sports && 'text-orange-600'}`}>
							Sports and Outdoors
						</Link>
						{isVisible.sports && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/exercise-equipment"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Exercise equipment
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/sports-gear">
									Sports gear
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/camping-gear">
									Camping gear
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 p-4 px-8"
									to="/catalog/hiking-gear">
									Hiking gear
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('toys')}
						onMouseLeave={() => hideCategory('toys')}>
						<Link to="/electronics" className={`${isVisible.toys && 'text-orange-600'}`}>
							Toys and Games
						</Link>
						{isVisible.toys && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/board-games"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Board games
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/video-games">
									Video games
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 p-4 px-8"
									to="/catalog/toys-children">
									Toys for children
								</Link>
							</div>
						)}
					</li>
					<li
						className="flex items-center justify-between p-2 cursor-pointer relative border-b border-slate-300"
						onMouseEnter={() => showCategory('entertainment')}
						onMouseLeave={() => hideCategory('entertainment')}>
						<Link to="/electronics" className={`${isVisible.entertainment && 'text-orange-600'}`}>
							Books and Media
						</Link>
						{isVisible.entertainment && (
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
								<Link
									to="/catalog/books"
									className="flex items-center hover:text-orange-600 p-4 px-8 border-r border-slate-400">
									Books
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-8"
									to="/catalog/music">
									Music
								</Link>
								<Link className="flex items-center hover:text-orange-600 p-4 px-8" to="/catalog/movies">
									Movies
								</Link>
							</div>
						)}
					</li>
				</ul>
			</div>

			<div className="w-4/5">
				<h2>Latest listed</h2>
				<div></div>
			</div>
		</div>
	);
};
