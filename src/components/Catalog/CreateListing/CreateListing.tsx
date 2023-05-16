import { useContext, useState } from 'react';
import useListing from '../../../hooks/useListing';
import { AuthContext } from '../../../contexts/AuthContext';
import { categoriesWithSubcategories } from '../../../types';

const CreateListing = () => {
	const [listingData, setListingData] = useState({
		category: '',
		subcategory: '',
	});
	const { user } = useContext(AuthContext);
	const { addListing } = useListing();

	// if (user) {
	// 	addListing({
	// 		title: 'Yeah',
	// 		price: 15,
	// 		category: 'electronics',
	// 		subcategory: 'computers',
	// 		description: 'Very nice',
	// 		imageUrl: 'https://m.media-amazon.com/images/I/51IpFZCaVsL._SX450_.jpg',
	// 	});
	// }

	const handleSubmit = () => {};

	console.log(listingData);

	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-8">Create a New Listing</h1>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="category">
						Category
					</label>
					<select
						id="category"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={listingData.category}
						onChange={(e) => setListingData((oldData) => ({ ...oldData, category: e.target.value }))}>
						<option value="">Select a category</option>
						{Object.keys(categoriesWithSubcategories).map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{listingData.category && (
						<>
							<label className="block text-gray-700 font-bold mb-2" htmlFor="category">
								Subcategory
							</label>
							<select
								id="subcategory"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								value={listingData.subcategory}
								onChange={(e) =>
									setListingData((oldData) => ({ ...oldData, subcategory: e.target.value }))
								}>
								<option value="">Select a subcategory</option>
								{Object.entries(categoriesWithSubcategories[listingData.category].subcategories).map(
									(subcategory) => (
										<option key={subcategory[0]} value={subcategory[0]}>
											{subcategory[1]}
										</option>
									)
								)}
							</select>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateListing;
