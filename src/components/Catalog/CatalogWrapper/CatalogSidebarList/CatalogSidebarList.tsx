import { Link } from 'react-router-dom';
import { categoriesWithSubcategories } from '../../../../types';

type CatalogSidebarListProps = {
	category: string;
	showCategory: (category: string) => void;
	hideCategory: (category: string) => void;
	isVisible: boolean;
};

const CatalogSidebarList = ({ category, showCategory, hideCategory, isVisible }: CatalogSidebarListProps) => {
	return (
		<li
			className="flex items-center justify-between cursor-pointer relative border-b border-slate-300"
			onMouseEnter={() => showCategory(category)}
			onMouseLeave={() => hideCategory(category)}>
			<Link to={`/catalog/${category}`} className={`p-2 pl-4 w-full ${isVisible ? 'text-orange-600' : ''}`}>
				{categoriesWithSubcategories[category].label}
			</Link>
			{isVisible && (
				<div className="flex text-center items-stretch align-items-center bg-slate-300 shadow-lg absolute left-full rounded-r-lg">
					{Object.entries(categoriesWithSubcategories[category].subcategories).map((x) => (
						<Link
							key={x[0]}
							to={`/catalog/${category}/${x[0]}`}
							className="flex items-center hover:text-orange-600 p-4 border-r border-slate-400 px-8 last:border-0">
							{x[1]}
						</Link>
					))}
				</div>
			)}
		</li>
	);
};

export default CatalogSidebarList;
