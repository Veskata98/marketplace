import { Link, useParams } from 'react-router-dom';

import { categoriesWithSubcategories } from '../../../types';

import { CatalogMainSection } from '../CatalogMainSection';

const CatalogCategory = () => {
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
				<CatalogMainSection category={category} subcategory={subcategory} />
				<Link to="/" className="absolute text-lg p-4 right-0 top-0 hover:text-orange-400">
					Back
				</Link>
			</div>
		</div>
	);
};

export default CatalogCategory;
