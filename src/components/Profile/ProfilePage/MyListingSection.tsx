import { useQuery } from 'react-query';
import { getMyListings } from '../../../api/listings';
import Spinner from '../../Spinner/Spinner';
import ListingCard from '../../Catalog/ListingCard/ListingCard';

type MyListingSectionProps = {
	userId: string;
};

const MyListingSection = ({ userId }: MyListingSectionProps) => {
	const { data, isLoading } = useQuery(['listings', 'my'], () => getMyListings(userId), {
		refetchOnMount: 'always',
	});

	if (isLoading) {
		return (
			<div className="flex align-middle justify-center items-center p-8 w-full">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="flex justify-center p-8 w-full">
			{data?.length ? (
				<div>
					<h2 className="pb-4 text-2xl text-center font-semibold">My Listings</h2>
					{data.map((x) => (
						<ListingCard key={x.id} listing={x} />
					))}
				</div>
			) : (
				<h2 className="text-2xl font-medium flex items-center">You have no listings yet</h2>
			)}
		</div>
	);
};

export default MyListingSection;
