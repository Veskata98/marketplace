import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import useAuth from '../../hooks/useAuth';

import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { NotificationContext } from '../../contexts/NotificationContext';

export const Header = () => {
	const { user } = useContext(AuthContext);
	const { notifications } = useContext(NotificationContext);

	const { basicSignOut } = useAuth();

	return (
		<div className="bg-orange-300 w-full h-16 flex items-center justify-between px-8">
			<Link to="/" className="text-2xl font-semibold text-gray-800">
				Let'Sell
			</Link>
			<ul className="flex items-center justify-end space-x-4">
				<li>
					<Link to="/" className="text-gray-800 hover:text-gray-900 font-semibold">
						Home
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
							<Link to="/listing/create" className="text-gray-800 hover:text-gray-900 font-semibold">
								Create Listing
							</Link>
						</li>
						<li>
							<Link
								to="/messages"
								className="text-gray-800 hover:text-gray-900 font-semibold flex items-center">
								{notifications !== 0 && (
									<span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full mr-1">
										{notifications}
									</span>
								)}
								Inbox
							</Link>
						</li>
						<li>
							<Link
								to={`/profile/${user.uid}`}
								className="flex gap-1 items-center justify-center"
								title="Go to Profile">
								<img
									className="w-10 h-10 rounded-full object-cover"
									src={user.photoURL || defaultAvatar}
									alt="profile_img"
									referrerPolicy="no-referrer"
									onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
										e.currentTarget.src = defaultAvatar;
									}}
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
