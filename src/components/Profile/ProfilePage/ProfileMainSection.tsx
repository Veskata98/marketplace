import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';

const ProfileMainSection = () => {
	const { user } = useContext(AuthContext);

	return (
		<div className="flex flex-col align-middle p-8 relative items-center">
			{/* {isMessageVisible && <p className="profile-message">{message}</p>} */}
			<h2 className="text-2xl text-black mb-4">{user?.displayName}</h2>
			<img
				className="w-48 h-48 rounded-full object-cover mb-4"
				src={user?.photoURL || defaultAvatar}
				alt="user_avatar"
			/>
			<form className="mb-10">
				<input className="mb-2" type="file" accept=".jpeg,.jpg,.png,.gif" />
				<button className="bg-orange-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-orange-600">
					Save
				</button>
			</form>
			<form className="mb-10 flex flex-col w-full">
				<input
					className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
					placeholder="Old Password"
					type="password"
					autoComplete="new-password"
					name="oldPassword"
				/>
				<input
					className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
					placeholder="New Password"
					type="password"
					name="newPassword"
				/>
				<input
					className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
					placeholder="Repeat New Password"
					type="password"
					name="repass"
				/>
				<button className="bg-orange-500 text-white py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-orange-600">
					Change password
				</button>
			</form>
			<button className="bg-red-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-out hover:bg-red-600">
				Delete account
			</button>
		</div>
	);
};

export default ProfileMainSection;
