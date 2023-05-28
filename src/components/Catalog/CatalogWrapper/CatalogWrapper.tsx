import { useState } from 'react';

import { categoriesWithSubcategories } from '../../../types';

import CatalogSidebarList from './CatalogSidebarList/CatalogSidebarList';
import { CatalogMainSection } from '../CatalogMainSection';

const CatalogWrapper = () => {
	const [isVisible, setIsVisible] = useState(
		Object.keys(categoriesWithSubcategories).reduce((acc, x) => ({ ...acc, [x]: false }), {})
	);

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
	return (
		<div className="flex gap-4 justify-between w-10/12">
			<div className="w-1/5 bg-slate-200 pt-2">
				<h2 className="text-xl font-bold mb-4 text-center">Categories</h2>
				<ul className="flex flex-col gap-1 align-middle">
					{Object.keys(categoriesWithSubcategories).map((x) => (
						<CatalogSidebarList
							key={x}
							category={x}
							showCategory={showCategory}
							hideCategory={hideCategory}
							isVisible={isVisible[x as keyof typeof isVisible]}
						/>
					))}
				</ul>
			</div>
			<div className="w-4/5 pb-8">
				<CatalogMainSection />
			</div>
		</div>
	);
};

export default CatalogWrapper;
