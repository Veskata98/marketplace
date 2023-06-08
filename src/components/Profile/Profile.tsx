import { useParams } from 'react-router-dom';
import MyListingSection from './ProfilePage/MyListingSection';
import ProfileMainSection from './ProfilePage/ProfileMainSection';

const Profile = () => {
	const { uid } = useParams();

	return (
		<div className="flex w-4/6">
			<ProfileMainSection />
			<MyListingSection userId={uid!} />
		</div>
	);
};

export default Profile;
