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

// export interface Subcategories {
// 	computers: boolean;
// 	phones: boolean;
// 	['audio-and-video']: boolean;
// 	gaming: boolean;

// 	['clothing-men']: boolean;
// 	['clothing-women']: boolean;
// 	['clothing-kids']: boolean;
// 	shoes: boolean;
// 	accessories: boolean;

// 	cars: boolean;
// 	motorcycles: boolean;
// 	trucks: boolean;
// 	boats: boolean;
// 	['other-vehicles']: boolean;

// 	furniture: boolean;
// 	decor: boolean;
// 	appliances: boolean;
// 	tools: boolean;

// 	makeup: boolean;
// 	skincare: boolean;
// 	haircare: boolean;
// 	grooming: boolean;

// 	['exercise-equipment']: boolean;
// 	['sports-gear']: boolean;
// 	['camping-gear']: boolean;
// 	['hiking-gear']: boolean;

// 	['board-games']: boolean;
// 	['video-games']: boolean;
// 	['toys-children']: boolean;

// 	books: boolean;
// 	music: boolean;
// 	movies: boolean;
// }

export interface Character {
	name: string;
	height: string;
}

export interface AuthContextType {
	user: User | null;
	saveUserToLocalStorage: (user: User) => void;
	removeUserFromLocalStorage: () => void;
}
