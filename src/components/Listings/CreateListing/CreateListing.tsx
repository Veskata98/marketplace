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
			description: 'Very nice',
			imageUrl: 'http...',
		});
	}

	return <div></div>;
};

export default CreateListing;
