import { CategoryWithSubcategories } from '../types';

/* eslint-disable no-useless-computed-key */
export const scrollToBottom = () => {
	window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
};

export const categoriesWithSubcategories: CategoryWithSubcategories = {
	electronics: ['computers', 'phones', 'audio-and-video', 'gaming'],
	vehicles: ['cars', 'motorcycles', 'trucks', 'boats', 'other-vehicles'],
	clothes: ['clothing-men', 'clothing-women', 'clothing-kids', 'shoes', 'accessories'],
	home: ['furniture', 'decor', 'appliances', 'tools'],
	beauty: ['makeup', 'skincare', 'haircare', 'grooming'],
	sports: ['exercise-equipment', 'sports-gear', 'camping-gear', 'hiking-gear'],
	toys: ['board-games', 'video-games', 'toys-children'],
	entertainment: ['books', 'music', 'movies'],
};

export const CATEGORY_LABELS = {
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
