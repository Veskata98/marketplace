import { FormEvent, useContext, useState } from 'react';
import useListing from '../../../hooks/useListing';
import { AuthContext } from '../../../contexts/AuthContext';
import { categoriesWithSubcategories } from '../../../types';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
	const [listingData, setListingData] = useState({
		title: '',
		price: 0,
		description: '',
		category: '',
		subcategory: '',
		imageUrl: '',
	});
	const [file, setFile] = useState();
	const [preview, setPreview] = useState('');

	const { user } = useContext(AuthContext);
	const { addListing } = useListing();
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (user) {
			addListing({
				title: listingData.title,
				price: listingData.price,
				category: listingData.category,
				subcategory: listingData.subcategory,
				description: listingData.description,
				imageUrl: listingData.imageUrl,
				creatorId: user.uid,
				creator: user.displayName as string,
				creatorAvatar: user.photoURL || null,
			});
			navigate('/');
		}
	};

	const avatarChangeHandler = (event: any) => {
		setFile(event.target.files[0]);
		setPreview(URL.createObjectURL(event.target.files[0]));
	};

	return (
		<div className="flex h-full w-full justify-center my-10">
			<form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-4">Create a New Listing</h1>
				<div className="mb-8 flex flex-col gap-4">
					<div>
						{preview && <img className="w-2/3 m-auto object-contain h-60" src={preview} alt="img" />}
						<label className="block text-gray-700 font-bold mb-1" htmlFor="image">
							Image
						</label>
						<input
							id="image"
							type="file"
							accept="image/png, image/jpeg"
							onChange={avatarChangeHandler}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
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
							className={`${
								!listingData.category && 'text-gray-500'
							} shadow appearance-none border cursor-pointer rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none shadow-outline`}
							value={listingData.category}
							onChange={(e) =>
								setListingData((oldData) => ({ ...oldData, category: e.target.value, subcategory: '' }))
							}>
							<option value="" disabled hidden>
								Select a category
							</option>
							{Object.entries(categoriesWithSubcategories).map((category) => (
								<option key={category[0]} value={category[0]} className="text-black">
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
								className={`${
									!listingData.subcategory && 'text-gray-500'
								} shadow appearance-none border cursor-pointer rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline`}
								value={listingData.subcategory}
								onChange={(e) =>
									setListingData((oldData) => ({ ...oldData, subcategory: e.target.value }))
								}>
								<option value="" disabled hidden>
									Select a subcategory
								</option>
								{Object.entries(categoriesWithSubcategories[listingData.category].subcategories).map(
									(subcategory) => (
										<option key={subcategory[0]} value={subcategory[0]} className="text-black">
											{subcategory[1]}
										</option>
									)
								)}
							</select>
						</div>
					)}
					<div>
						<label className="block text-gray-700 font-bold mb-1" htmlFor="price">
							Price
						</label>
						<input
							id="price"
							className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
							value={listingData.price || ''}
							type="number"
							onChange={(e) => setListingData((oldData) => ({ ...oldData, price: +e.target.value }))}
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-bold mb-1" htmlFor="description">
							Description
						</label>
						<textarea
							id="description"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={listingData.description}
							onChange={(e) => setListingData((oldData) => ({ ...oldData, description: e.target.value }))}
						/>
					</div>
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
