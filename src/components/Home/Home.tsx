import { Key, useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import { Character } from '../../interfaces';

export const Home = () => {
	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		axios.get('https://swapi.dev/api/people/').then((response) => {
			const data = response.data.results;
			setCharacters(data);
		});
	}, []);

	return (
		<div>
			<h1>Newest products</h1>
			<ul>
				{characters.map((x) => (
					<CharacterCard key={x.name as Key} character={x} />
				))}
			</ul>
		</div>
	);
};
