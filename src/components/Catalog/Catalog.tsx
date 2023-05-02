import { useState } from 'react';
import { CatalogCategories } from '../../interfaces';
import { Link } from 'react-router-dom';

export const Catalog = () => {
	const [isVisible, setIsVisible] = useState<CatalogCategories>({
		electronics: false,
		clothes: false,
		food: false,
		vehicles: false,
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
							<div className="flex gap-2 bg-slate-300 shadow-lg absolute left-full">
								<Link to="/computers" className="hover:text-orange-600 p-4 border-r border-slate-400">
									Computers
								</Link>
								<Link className="hover:text-orange-600 border-r border-slate-400 p-4" to="/laptops">
									Laptops
								</Link>
								<Link className="hover:text-orange-600 border-r border-slate-400 p-4" to="/tvs">
									TVs
								</Link>
								<Link className="hover:text-orange-600 border-r border-slate-400 p-4" to="/consoles">
									Consoles
								</Link>
								<Link className="hover:text-orange-600 p-4" to="/peripherals">
									Peripherals
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
							<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full">
								<Link
									to="/computers"
									className="hover:text-orange-600 p-4 px-6 border-r border-slate-400">
									Men's clothing
								</Link>
								<Link
									className="hover:text-orange-600 border-r border-slate-400 p-4 px-6"
									to="/laptops">
									Women's clothing
								</Link>
								<Link className="hover:text-orange-600 border-r border-slate-400 p-4 px-6" to="/tvs">
									Kid's clothing
								</Link>
								<Link
									className="flex items-center hover:text-orange-600 border-r border-slate-400 p-4 px-6"
									to="/consoles">
									Shoes
								</Link>
								<Link className="flex items-center hover:text-orange-600 p-4 px-6" to="/peripherals">
									Accessories
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
