import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Listing, categoriesWithSubcategories } from '../../../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Spinner from '../../Spinner/Spinner';

const EditListing = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [imageFile, setImageFile] = useState<File>();
	const [preview, setPreview] = useState('');
	const [listing, setListing] = useState<Listing>();
	const { listingId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (listingId) {
			const docRef = doc(db, 'listings', listingId);
			getDoc(docRef)
				.then((snapshot) => {
					setListing(snapshot.data() as Listing);
					setPreview(snapshot.data()!.imageUrl);
					setIsLoading(false);
				})
				.catch(() => {
					navigate('/404');
				});
		} else {
			navigate('/404');
		}
	}, [listingId, navigate]);

	const avatarChangeHandler = (event: any) => {
		setImageFile(event.target.files[0]);
		setPreview(URL.createObjectURL(event.target.files[0]));
	};

	return (
		<div className="flex h-full w-full justify-center my-10">
			{!isLoading ? (
				<form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
					<h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
					<div className="mb-8 flex flex-col gap-4">
						<div>
							{preview && <img className="w-2/3 m-auto object-contain h-60" src={preview} alt="img" />}
							<label className="block text-gray-700 font-bold mb-1" htmlFor="image">
								Image
							</label>
							<input
								type="file"
								accept="image/png, image/jpeg"
								onChange={avatarChangeHandler}
								name="image"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="title">
								Title
							</label>
							<input
								className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								value={listing?.title}
								name="title"
								onChange={(e) => setListing((oldData) => ({ ...oldData!, title: e.target.value }))}
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="category">
								Category
							</label>
							<input
								className={`${
									!listing?.category && 'text-gray-500'
								} shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none shadow-outline`}
								value={categoriesWithSubcategories[listing!.category].label}
								disabled
								name="category"></input>
						</div>
						{listing?.category && (
							<div>
								<label className="block text-gray-700 font-bold mb-1" htmlFor="category">
									Subcategory
								</label>
								<input
									className={`${
										!listing.subcategory && 'text-gray-500'
									} shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline`}
									value={
										categoriesWithSubcategories[listing.category].subcategories[listing.subcategory]
									}
									disabled
									name="subcategory"></input>
							</div>
						)}
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="price">
								Price
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								value={listing?.price}
								type="number"
								name="price"
								onChange={(e) => setListing((oldData) => ({ ...oldData!, price: +e.target.value }))}
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="description">
								Description
							</label>
							<textarea
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								value={listing?.description}
								name="description"
								onChange={(e) =>
									setListing((oldData) => ({ ...oldData!, description: e.target.value }))
								}
							/>
						</div>
					</div>
					<button
						className="cursor-pointer text-slate-700 disabled:text-slate-400 w-full bg-orange-300 p-2 rounded"
						disabled={false}>
						Edit listing
					</button>
				</form>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default EditListing;
