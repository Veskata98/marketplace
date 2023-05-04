import { DocumentReference } from 'firebase/firestore';
import { ReactNode } from 'react';

export type ChildrenProps = {
	children: ReactNode;
};

export type Listing = {
	creatorId?: DocumentReference;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	createdAt?: Date;
	modifiedAt?: Date;
};
