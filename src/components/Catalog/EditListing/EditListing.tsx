import { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import brokenImg from '../../../assets/images/broken-img.png';

import { Listing, categoriesWithSubcategories } from '../../../types';
import Spinner from '../../Spinner/Spinner';
import useListing from '../../../hooks/useListing';
import { getListing } from '../../../api/listings';
import { AuthContext } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

type EditListingItems = {
	listing: Partial<Listing>;
	imageFile: File | undefined;
};

const EditListing = () => {
	const [imageFile, setImageFile] = useState<File>();
	const [preview, setPreview] = useState('');
	const [listing, setListing] = useState<Listing>();
	const [buttonIsClickable, setButtonIsClickable] = useState(true);

	const { listingId } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const { editListing } = useListing();

	const { data, isError, isLoading } = useQuery(['listing', listingId], () => getListing(listingId, user), {
		refetchOnMount: 'always',
	});

	const { mutateAsync } = useMutation(({ listing, imageFile }: EditListingItems) => editListing(listing, imageFile), {
		onSuccess: () => {
			queryClient.invalidateQueries(['listing', listingId]);
		},
	});

	useEffect(() => {
		if (data) {
			setPreview(data.imageUrl);
			setListing(data);
		}
	}, [data]);

	useEffect(() => {
		if (listing) {
			if (Object.values(listing).some((x) => !x)) {
				setButtonIsClickable(false);
			} else {
				setButtonIsClickable(true);
			}
		}
	}, [listing]);

	if (isLoading) {
		return (
			<div className="flex gap-6 w-9/12 mb-16 relative">
				<Spinner />
			</div>
		);
	}

	if (isError || !data) {
		return <Navigate to="/404" />;
	}

	const avatarChangeHandler = (event: any) => {
		setImageFile(event.target.files[0]);
		setPreview(URL.createObjectURL(event.target.files[0]));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (listing) {
			await mutateAsync({ listing, imageFile });
			navigate(`/catalog/${listing.category}/${listing.subcategory}/${listing.id}`, { replace: true });
		}
	};

	const handleImageError = () => {
		setPreview(brokenImg);
	};

	return (
		<div className="flex h-full w-full justify-center my-10 relative">
			<Link
				to={`/catalog/${data.category}/${data.subcategory}/${data.id}`}
				replace={true}
				className="absolute left-96 hover:underline">
				<FontAwesomeIcon icon={faArrowLeftLong} /> Back to the listing
			</Link>
			<form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
				<div className="mb-8 flex flex-col gap-4">
					<div>
						<div className="shadow-md">
							<img
								src={preview}
								alt={data.title}
								className="w-full m-auto object-cover object-center h-60"
								onError={handleImageError}
							/>
						</div>
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
							className="shadow appearance-none border rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
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
								data.category && 'text-gray-500'
							} shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none shadow-outline`}
							value={categoriesWithSubcategories[data.category].label}
							disabled
							name="category"></input>
					</div>
					{data?.category && (
						<div>
							<label className="block text-gray-700 font-bold mb-1" htmlFor="category">
								Subcategory
							</label>
							<input
								className={`${
									data.subcategory && 'text-gray-500'
								} shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline`}
								value={categoriesWithSubcategories[data.category].subcategories[data.subcategory]}
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
							className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
							value={listing?.description}
							name="description"
							onChange={(e) => setListing((oldData) => ({ ...oldData!, description: e.target.value }))}
						/>
					</div>
				</div>
				<button
					className="cursor-pointer text-black font-medium disabled:text-slate-700 disabled:cursor-default disabled:bg-slate-300 w-full bg-orange-300 p-2 rounded"
					disabled={!buttonIsClickable}>
					Edit listing
				</button>
			</form>
		</div>
	);
};

export default EditListing;
