import { User } from 'firebase/auth';

export interface CatalogCategories {
	electronics: boolean;
	vehicles: boolean;
	clothes: boolean;
	home: boolean;
	beauty: boolean;
	sports: boolean;
	toys: boolean;
	entertainment: boolean;
}

export interface Character {
	name: string;
	height: string;
}

export interface AuthContextType {
	user: User | null;
	saveUserToLocalStorage: (user: User) => void;
	removeUserFromLocalStorage: () => void;
}
