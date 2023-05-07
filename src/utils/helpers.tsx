/* eslint-disable no-useless-computed-key */
export const scrollToBottom = () => {
	window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
};

export const CATEGORIES = {
	computers: 'Computers',
	phones: 'Phones and accessories',
	['audio-and-video']: 'Audio and Video',
	gaming: 'Gaming',

	['clothing-men']: "Men's clothing",
	['clothing-women']: "Women's clothing",
	['clothing-kids']: "Kid's clothing",
	shoes: 'Shoes',
	accessories: 'Accessories',

	cars: 'Cars',
	motorcycles: 'Motorcycles',
	trucks: 'Trucks',
	boats: 'Boats',
	['other-vehicles']: 'Other vehicles',

	furniture: 'Furniture',
	decor: 'Decor',
	appliances: 'Appliances',
	tools: 'Tools',

	makeup: 'Makeup',
	skincare: 'Skincare',
	haircare: 'Haircare',
	grooming: 'Grooming',

	['exercise-equipment']: 'Exercise equipment',
	['sports-gear']: 'Sports gear',
	['camping-gear']: 'Camping gear',
	['hiking-gear']: 'Hiking gear',

	['board-games']: 'Board games',
	['video-games']: 'Video games',
	['toys-children']: 'Toys for children',

	books: 'Books',
	music: 'Music',
	movies: 'Movies',
};
