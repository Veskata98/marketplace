import { Key, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import { Character } from '../../interfaces';
import { AuthContext } from '../../contexts/AuthContext';

export const Home = () => {
	const { user } = useContext(AuthContext);

	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		axios.get('https://swapi.dev/api/people/').then((response) => {
			const data = response.data.results;
			setCharacters(data);
		});
	}, []);

	return (
		<div>
			<h1>Home Page - Welcome {user?.email}</h1>
			<ul>
				{characters.map((x) => (
					<CharacterCard key={x.name as Key} character={x} />
				))}
			</ul>
		</div>
	);
};
