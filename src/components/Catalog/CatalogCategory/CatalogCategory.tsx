import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { categoriesWithSubcategories } from '../../../types';

import { CatalogMainSection } from '../CatalogMainSection/CatalogMainSection';

const CatalogCategory = () => {
	const [sortBy, setSortBy] = useState<string>();

	const { category, subcategory } = useParams<{ category: string; subcategory: string }>();

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
								className="flex items-center justify-between cursor-pointer relative border-b border-slate-300">
								<Link
									to={`/catalog/${category}/${x[0]}`}
									className="p-2 pl-4 w-full hover:text-orange-500">
									{x[1]}
								</Link>
							</li>
						))}
					</ul>
				)}
				{subcategory && (
					<div>
						<p>Sort by:</p>
						<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
							<option value="first">1</option>
							<option value="second">2</option>
							<option value="third">3</option>
						</select>
						<input type="range" />
					</div>
				)}
			</div>
			<div className="w-4/5 pb-8 relative">
				<CatalogMainSection category={category} subcategory={subcategory} />
				<Link to="/" className="absolute text-lg p-4 right-0 top-0 hover:text-orange-400">
					Back
				</Link>
			</div>
		</div>
	);
};

export default CatalogCategory;
