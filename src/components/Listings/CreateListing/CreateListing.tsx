import { useContext } from 'react';
import useListing from '../../../hooks/useListing';
import { AuthContext } from '../../../contexts/AuthContext';

const CreateListing = () => {
	const { user } = useContext(AuthContext);
	const { addListing } = useListing();

	if (user) {
		addListing({
			title: 'Yeah',
			price: 15,
			category: 'electronics',
			subcategory: 'computers',
			description: 'Very nice',
			imageUrl: 'https://m.media-amazon.com/images/I/51IpFZCaVsL._SX450_.jpg',
		});
	}

	return <div></div>;
};

export default CreateListing;
