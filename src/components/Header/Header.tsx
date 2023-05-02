import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';

import defaulAvatar from '../../assets/images/defaultAvatar.png';

export const Header = () => {
	const { user } = useContext(AuthContext);

	const { basicSignOut } = useAuth();

	return (
		<div className="bg-orange-300 w-full h-16 flex items-center justify-between px-4">
			<Link to="/" className="text-2xl font-semibold text-gray-800">
				My Store
			</Link>
			<ul className="flex items-center justify-end space-x-4">
				<li>
					<Link to="/" className="text-gray-800 hover:text-gray-900 font-semibold">
						Home
					</Link>
				</li>
				<li>
					<Link to="/catalog" className="text-gray-800 hover:text-gray-900 font-semibold">
						Catalog
					</Link>
				</li>
				{!user ? (
					<>
						<li>
							<Link to="/auth/signin" className="text-gray-800 hover:text-gray-900 font-semibold">
								Sign In
							</Link>
						</li>
						<li>
							<Link
								to="/auth/signup"
								className="text-white bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 ease-in-out font-semibold">
								Sign Up
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to={`/profile/${user.uid}`} className="flex gap-1 items-center justify-center ">
								<img
									className="w-10 h-10 rounded-full object-contain"
									src={user.photoURL || defaulAvatar}
									alt="profile_img"
								/>
								<span className="font-semibold">{user.displayName}</span>
							</Link>
						</li>
						<button className="font-semibold" onClick={basicSignOut}>
							Sign Out
						</button>
					</>
				)}
			</ul>
		</div>
	);
};
