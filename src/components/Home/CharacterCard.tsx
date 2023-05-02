import React from 'react';
import { Character } from '../../interfaces';

const CharacterCard = ({ character }: { character: Character }) => {
	return (
		<li>
			{character.name} is {character.height} tall
		</li>
	);
};

export default CharacterCard;
