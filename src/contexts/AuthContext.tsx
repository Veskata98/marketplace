import { useState, createContext } from 'react';

import { ChildrenProps } from '../types';
import { AuthContextType } from '../interfaces';
import { User } from 'firebase/auth';

export const AuthContext = createContext<AuthContextType>({
	user: null,
	saveUserToLocalStorage: () => {},
	removeUserFromLocalStorage: () => {},
	changeAvatarInLocalStorage: () => {},
});

export const AuthProvider = ({ children }: ChildrenProps) => {
	const [user, setUser] = useState<User | null>(() => {
		const userFromLocalStorage = localStorage.getItem('user');
		return userFromLocalStorage ? (JSON.parse(userFromLocalStorage) as User) : null;
	});

	const saveUserToLocalStorage = async (user: User) => {
		// const userToSave = { ...user, displayName: user.displayName?.split(' ')[0] } as User;

		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('IDToken', JSON.stringify(await user.getIdToken()));

		setUser(user);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('IDToken');
		setUser(null);
	};

	const changeAvatarInLocalStorage = (photoURL: string) => {
		setUser((oldData) => ({ ...oldData!, photoURL }));
		localStorage.setItem('user', JSON.stringify({ ...user, photoURL }));
	};

	return (
		<AuthContext.Provider
			value={{ user, saveUserToLocalStorage, removeUserFromLocalStorage, changeAvatarInLocalStorage }}>
			{children}
		</AuthContext.Provider>
	);
};
