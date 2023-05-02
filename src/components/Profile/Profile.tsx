import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const { uid } = useParams();

	return <div>{uid}</div>;
};

export default Profile;
