import { DocumentReference } from 'firebase/firestore';
import { ReactNode } from 'react';
import { CatalogCategories } from './interfaces';

export type ChildrenProps = {
	children: ReactNode;
};

export type Listing = {
	id?: string;
	creator?: string;
	creatorAvatar?: string;
	category?: keyof CatalogCategories;
	creatorId?: DocumentReference;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	createdAt?: number;
	modifiedAt?: number;
};
