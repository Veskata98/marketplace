import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import useProfile from '../../../hooks/useProfile';

const ProfileMainSection = () => {
	const { user } = useContext(AuthContext);

	const [imageFile, setImageFile] = useState<File | null>();
	const [preview, setPreview] = useState(() => user?.photoURL || '');
	const [message, setMessage] = useState('');
	const [isMessageVisible, setIsMessageVisible] = useState(false);

	const { changeAvatar } = useProfile();

	const changeAvatarSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (imageFile) {
			await changeAvatar(imageFile);

			setMessage('Profile picture successfully changed!');

			setIsMessageVisible(true);

			setTimeout(() => {
				setIsMessageVisible(false);
				setMessage('');
				setImageFile(null);
			}, 2000);
		}
	};

	return (
		<>
			{isMessageVisible && (
				<p className="bg-green-400 text-white absolute rounded text-xl right-10 top-10 shadow px-4 py-2">
					{message}
				</p>
			)}
			<div className="flex flex-col align-middle my-8 px-8 relative items-center border-r border-orange-500 w-2/5">
				<h2 className="text-2xl text-black mb-4">{user?.displayName}</h2>
				<img
					className="w-48 h-48 rounded-full object-cover object-center mb-4"
					src={preview || user?.photoURL || defaultAvatar}
					alt="user_avatar"
				/>
				<form className="mb-10" onSubmit={changeAvatarSubmitHandler}>
					<input
						className="mb-2 w-full"
						type="file"
						accept=".jpeg,.jpg,.png,.gif"
						onChange={(e) => {
							if (e.target.files?.length) {
								setImageFile(e.target.files[0]);
								setPreview(URL.createObjectURL(e.target.files[0]));
							}
						}}
					/>
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
		</>
	);
};

export default ProfileMainSection;
