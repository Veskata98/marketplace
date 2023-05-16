import { User } from 'firebase/auth';

export interface AuthContextType {
	user: User | null;
	saveUserToLocalStorage: (user: User) => void;
	removeUserFromLocalStorage: () => void;
}
