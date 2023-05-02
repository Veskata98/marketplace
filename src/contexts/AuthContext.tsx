import { useState, createContext } from 'react';

import { ChildrenProps } from '../types';
import { AuthContextType } from '../interfaces';
import { User } from 'firebase/auth';

export const AuthContext = createContext<AuthContextType>({
	user: null,
	saveUserToLocalStorage: () => {},
	removeUserFromLocalStorage: () => {},
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

	return (
		<AuthContext.Provider value={{ user, saveUserToLocalStorage, removeUserFromLocalStorage }}>
			{children}
		</AuthContext.Provider>
	);
};
