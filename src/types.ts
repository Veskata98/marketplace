import { DocumentReference } from 'firebase/firestore';
import { ReactNode } from 'react';
import { CatalogCategories } from './interfaces';
import { CATEGORIES } from './utils/helpers';

export type ChildrenProps = {
	children: ReactNode;
};

export type Category = keyof typeof CATEGORIES;

export type Listing = {
	id?: string;
	creator?: string;
	creatorAvatar?: string;
	category?: keyof CatalogCategories;
	subcategory?: Category;
	creatorId?: DocumentReference;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	createdAt?: number;
	modifiedAt?: number;
};
