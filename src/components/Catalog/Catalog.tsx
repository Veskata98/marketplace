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
		<div className="flex">
			<div>
				<h2>Category:</h2>
				<ul className="gap-3 p-10 flex-col inline-flex">
					<li
						className="flex cursor-pointer ${}"
						onMouseEnter={() => showCategory('electronics')}
						onMouseLeave={() => hideCategory('electronics')}>
						<Link to="/electronics" className={`${isVisible.electronics && 'text-orange-600'}`}>
							Electronics
						</Link>
						{isVisible.electronics && (
							<div className="flex gap-2 ml-4">
								<Link to="/computers" className="hover:text-orange-600 p-2 pt-0">
									Computers
								</Link>
								<Link to="/laptops">Laptops</Link>
								<Link to="/tvs">TVs</Link>
								<Link to="/consoles">Consoles</Link>
								<Link to="/peripherals">Peripherals</Link>
							</div>
						)}
					</li>

					<li
						className="category-title"
						onMouseEnter={() => showCategory('vehicles')}
						onMouseLeave={() => hideCategory('vehicles')}>
						Vehicles
						<div className="catalog-subcategories">{isVisible.vehicles && <h2>Vehicles</h2>}</div>
					</li>

					<li
						className="category-title"
						onMouseEnter={() => showCategory('clothes')}
						onMouseLeave={() => hideCategory('clothes')}>
						Clothes
						<div className="catalog-subcategories">{isVisible.clothes && <h2>Clothes</h2>}</div>
					</li>

					<li
						className="category-title"
						onMouseEnter={() => showCategory('food')}
						onMouseLeave={() => hideCategory('food')}>
						Food
						<div className="catalog-subcategories">{isVisible.food && <h2>Food</h2>}</div>
					</li>
				</ul>
			</div>

			<div>
				<h2>Latest listed</h2>
				<div></div>
			</div>
		</div>
	);
};
