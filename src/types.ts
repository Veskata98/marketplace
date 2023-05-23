import { ReactNode } from 'react';

export type ChildrenProps = {
	children: ReactNode;
};

export type ListingCardProps = {
	listing: Listing;
};

export type CategoryWithSubcategories = {
	label: string;
	subcategories: {
		[subcategory: string]: string;
	};
};

export const categoriesWithSubcategories: {
	[category: string]: CategoryWithSubcategories;
} = {
	electronics: {
		label: 'Electronics',
		subcategories: {
			computers: 'Computers',
			phones: 'Phones and accessories',
			'audio-and-video': 'Audio and Video',
			gaming: 'Gaming',
		},
	},
	vehicles: {
		label: 'Vehicles',
		subcategories: {
			cars: 'Cars',
			motorcycles: 'Motorcycles',
			trucks: 'Trucks',
			boats: 'Boats',
			'other-vehicles': 'Other vehicles',
		},
	},
	clothes: {
		label: 'Clothing and Accessories',
		subcategories: {
			'clothing-men': "Men's clothing",
			'clothing-women': "Women's clothing",
			'clothing-kids': "Kid's clothing",
			shoes: 'Shoes',
			accessories: 'Accessories',
		},
	},
	home: {
		label: 'Home and Garden',
		subcategories: {
			furniture: 'Furniture',
			decor: 'Decor',
			appliances: 'Appliances',
			tools: 'Tools',
		},
	},
	beauty: {
		label: 'Beauty and Personal Care',
		subcategories: {
			makeup: 'Makeup',
			skincare: 'Skincare',
			haircare: 'Haircare',
			grooming: 'Grooming',
		},
	},
	sports: {
		label: 'Sports and Outdoors',
		subcategories: {
			'exercise-equipment': 'Exercise equipment',
			'sports-gear': 'Sports gear',
			'camping-gear': 'Camping gear',
			'hiking-gear': 'Hiking gear',
		},
	},
	toys: {
		label: 'Toys and Games',
		subcategories: {
			'board-games': 'Board games',
			'video-games': 'Video games',
			'toys-children': 'Toys for children',
		},
	},
	entertainment: {
		label: 'Books and Media',
		subcategories: {
			books: 'Books',
			music: 'Music',
			movies: 'Movies',
		},
	},
};

export type Listing = {
	id?: string;
	creator: string | null;
	creatorAvatar: string | null;
	category: keyof typeof categoriesWithSubcategories;
	subcategory: keyof (typeof categoriesWithSubcategories)[keyof typeof categoriesWithSubcategories]['subcategories'];
	creatorId?: string;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	createdAt?: number;
	modifiedAt?: number;
};
