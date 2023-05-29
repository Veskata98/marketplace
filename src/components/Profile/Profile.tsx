import { useParams } from 'react-router-dom';
import { getMessages } from '../../api/messages';

const Profile = () => {
	const { uid } = useParams();

	getMessages(uid!).then((data) => console.log(data));

	return <div>{uid}</div>;
};

export default Profile;
