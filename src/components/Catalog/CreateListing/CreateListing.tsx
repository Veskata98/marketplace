import { FormEvent, useContext, useState } from 'react';
import useListing from '../../../hooks/useListing';
import { AuthContext } from '../../../contexts/AuthContext';
import { categoriesWithSubcategories } from '../../../types';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
	const [listingData, setListingData] = useState({
		title: '',
		category: '',
		subcategory: '',
	});
	const { user } = useContext(AuthContext);
	const { addListing } = useListing();
	const navigate = useNavigate();

	// if (user) {
	// 	addListing({
	// 		title: 'Sofa',
	// 		price: 15,
	// 		category: 'home',
	// 		subcategory: 'decor',
	// 		description: 'Amazing sofa for your home',
	// 		imageUrl:
	// 			'data:image/jpeg;base64,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',
	// 	});
	// }

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (user) {
			addListing({
				title: listingData.title,
				price: 1500,
				category: listingData.category,
				subcategory: listingData.subcategory,
				description: 'Amazing sofa for your home',
				imageUrl:
					'data:image/jpeg;base64,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',
				creatorId: user.uid,
				creator: user.displayName as string,
				creatorAvatar: user.photoURL || null,
			});
			navigate('/');
		}
	};

	console.log(listingData);

	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-8">Create a New Listing</h1>
				<div className="mb-8 flex flex-col gap-4">
					<div>
						<label className="block text-gray-700 font-bold mb-1" htmlFor="title">
							Title
						</label>
						<input
							id="title"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={listingData.title}
							onChange={(e) => setListingData((oldData) => ({ ...oldData, title: e.target.value }))}
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-1" htmlFor="category">
							Category
						</label>
						<select
							id="category"
							className="cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={listingData.category}
							onChange={(e) => setListingData((oldData) => ({ ...oldData, category: e.target.value }))}>
							<option value="">Select a category</option>
							{Object.entries(categoriesWithSubcategories).map((category) => (
								<option key={category[0]} value={category[0]}>
									{category[1].label}
								</option>
							))}
						</select>
					</div>
					{listingData.category && (
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="category">
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
						</div>
					)}
				</div>
				<button
					className="cursor-pointer text-slate-700 disabled:text-slate-400 w-full bg-orange-300 p-2 rounded"
					disabled={false}>
					Create listing
				</button>
			</form>
		</div>
	);
};

export default CreateListing;
