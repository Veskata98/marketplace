import { DocumentReference } from 'firebase/firestore';
import { ReactNode } from 'react';

export type ChildrenProps = {
	children: ReactNode;
};

export type Category = 'electronics' | 'vehicles' | 'clothes' | 'home' | 'beauty' | 'sports' | 'toys' | 'entertainment';

export type Subcategory =
	| 'computers'
	| 'phones'
	| 'audio-and-video'
	| 'gaming'
	| 'clothing-men'
	| 'clothing-women'
	| 'clothing-kids'
	| 'shoes'
	| 'accessories'
	| 'cars'
	| 'motorcycles'
	| 'trucks'
	| 'boats'
	| 'other-vehicles'
	| 'furniture'
	| 'decor'
	| 'appliances'
	| 'tools'
	| 'makeup'
	| 'skincare'
	| 'haircare'
	| 'grooming'
	| 'exercise-equipment'
	| 'sports-gear'
	| 'camping-gear'
	| 'hiking-gear'
	| 'board-games'
	| 'video-games'
	| 'toys-children'
	| 'books'
	| 'music'
	| 'movies';

export type CategoryWithSubcategories = {
	[key in Category]: Subcategory[];
};

export type Listing = {
	id?: string;
	creator?: string;
	creatorAvatar?: string;
	category?: Category;
	subcategory?: Subcategory;
	creatorId?: DocumentReference;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	createdAt?: number;
	modifiedAt?: number;
};
