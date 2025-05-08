import { useEffect, useState } from 'react';
import ButtonLink from '../buttonLink';
import ColorButtons from '../ColorButtons';
import { SoloGameState } from './SoloGameState';
import { useBackground } from '../BackgroundContext/BackgroundContext';
import './SoloGame.css';

const SoloGame = () => {
	const availableColors = ['Red', 'Yellow', 'Green', 'Blue'];
	const [gameColorChoices, setGameColorChoices] = useState<SoloGameState['gameColorChoices']>([]);
	const [playerChoices, setPlayerChoices] = useState<SoloGameState['playerChoices']>([]);
	const [round, setRound] = useState<SoloGameState['round']>(1);

	const { setFlashClass } = useBackground();

	const randomNumber = Math.floor(4 * Math.random());
	const selectedColor = availableColors[randomNumber];

	useEffect(() => {
		setGameColorChoices((prevChoices) => [...prevChoices, selectedColor]);
	}, [round]);

	useEffect(() => {
		gameColorChoices.forEach((color, index) => {
			const flashButtonColors = document.querySelector<HTMLButtonElement>(
				`.${color}`,
			);
			if (flashButtonColors) {
				setTimeout(() => {
					flashButtonColors.style.backgroundColor = 'rgb(240, 240, 240)';
				}, index * 750);
				setTimeout(
					() => {
						flashButtonColors.style.backgroundColor = '';
					},
					index * 750 + 600,
				);
			}
		});
	}, [gameColorChoices]);

	const Sequence = async (colorChosenByPlayer: string) => {
		setPlayerChoices(playerChoices.concat(colorChosenByPlayer));
		const correctColor =
			colorChosenByPlayer === gameColorChoices[playerChoices.length];

		if (correctColor) {
			setFlashClass('flash-green');
			setTimeout(() => setFlashClass(''), 300);

			if (playerChoices.length + 1 === gameColorChoices.length) {
				setRound(round + 1);
				setPlayerChoices([]);
			}
		} else {
			setFlashClass('flash-red');
			setTimeout(() => setFlashClass(''), 300);

			if (round !== 1) {
				setRound(1);
				setGameColorChoices([]);
				setPlayerChoices([]);
			} else {
				setRound(1);
				setGameColorChoices([gameColorChoices[0]]);
				setPlayerChoices([]);
			}
		}
	};
	return (
		<div className="soloGame">
			<h1>Round {round}</h1>
			<ColorButtons Sequence={Sequence}></ColorButtons>
			<ButtonLink buttontext={'Back'} to={'/'} id={'BackButton'}></ButtonLink>
		</div>
	);
};

export default SoloGame;
