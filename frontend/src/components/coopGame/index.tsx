import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import io from 'socket.io-client';
import './coopGame.css';
import ColorButtons from '../ColorButtons';
import { useAuth } from '../../hooks/useAuth';
import { useBackground } from '../BackgroundContext/BackgroundContext';
import SnackBar from '../snackbar';

const cookies = new Cookies();
const socket = io(import.meta.env.VITE_API_URL);

const CoopGame = () => {
	const { id } = useParams();
	const [room, setRoom] = useState<any>(null);
	const { userName } = useAuth();
	const { setFlashClass } = useBackground();
	const [player2, setPlayer2] = useState<any>(null);
	const [playerJoined, setPlayerJoined] = useState<boolean>(false);
	const [playerClicked, setPlayerClicked] = useState<boolean>(false);
	const [notCurrentPlayer, setNotCurrentPlayer] = useState<boolean>(false);
	const [playerClickedMessage, setPlayerClickedMessage] = useState<string>('');
	const [playerJoinedMessage, setPlayerJoinedMessage] = useState<string>('');
	const [gameColorChoices, setGameColorChoices] = useState<Room['gameSequence']>([]);
	const [round, setRound] = useState<Room['round']>();

	useEffect(() => {
		const token = cookies.get('token');

		axios.get(`${import.meta.env.VITE_API_URL}coopRoom/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				console.log("Sala carregada:", res.data);
				socket.emit('joinRoom', res.data);
			})
			.catch((err) => {
				console.error("Erro ao buscar sala:", err);
			});

		// Listeners
		socket.on('receive_data', (data) => {
			console.log("Estado do jogo atualizado:", data);
			setPlayer2(data.player2);
			setGameColorChoices(data.gameColorChoices);
			setRound(data.round);
			setRoom(data);
		});

		socket.on('player_joined', (data) => {
			console.log(data.message);
			setPlayerJoinedMessage(data.message);
			setPlayerJoined(true);
		});		socket.on('roomUpdated', (data) => {
			console.log("Clique registrado:", data);
			setPlayerClicked(data.clicked);
			setPlayerClickedMessage(data.message);

			if (data.correct) {
				setFlashClass('flash-green');
				setTimeout(() => setFlashClass(''), 300);
			} else {
				setFlashClass('flash-red');
				setTimeout(() => setFlashClass(''), 300);
			}
		});

		return () => {
			socket.off('player_joined');
			socket.off('receive_data');
			socket.off('roomUpdated');
		};
	}, [id]);

	useEffect(() => {
		console.log(gameColorChoices);

		const flashSequence = async () => {
			for (let i = 0; i < gameColorChoices.length; i++) {
				const color = gameColorChoices[i];
				const flashButtonColors = document.querySelector<HTMLButtonElement>(`.${color}`);

				if (flashButtonColors) {
					flashButtonColors.style.backgroundColor = 'rgb(240, 240, 240)';
					await new Promise(resolve => setTimeout(resolve, 600));
					flashButtonColors.style.backgroundColor = '';
					await new Promise(resolve => setTimeout(resolve, 150));
				}
			}
		};

		flashSequence();
	}, [round]);

	if (!room) return <p>Erro ao carregar sala.</p>;

	const Sequence = async (colorChosenByPlayer: string) => {
		const token = cookies.get('token');
		try {
			const response = await axios.patch(
				`${import.meta.env.VITE_API_URL}coopRoom/update`,
				{
					roomName: room.roomName,
					colorChosenByPlayer
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
					if (response.data) {
				socket.emit('playerClicked', {
					userName,
					colorChosenByPlayer,
					room: response.data.room,
					correct: response.data.correct
				});
			}
		} catch (error) {
			console.error("Erro ao processar jogada:", error);
			setNotCurrentPlayer(true);
		}
	};
	return (
		<div className='coopGame'>
			<SnackBar
				errorAlert={false}
				setErrorAlert={() => { }}
				sucessAlert={playerJoined}
				setSucessAlert={setPlayerJoined}
				sucessMessage={playerJoinedMessage}
				errorMessage="Erro ao conectar"
				autoHideDuration={2000}
				vertical='bottom'
				horizontal='center'
			/>
			<SnackBar
				errorAlert={false}
				setErrorAlert={() => { }}
				sucessAlert={playerClicked}
				setSucessAlert={setPlayerClicked}
				sucessMessage={playerClickedMessage}
				errorMessage="Erro ao conectar"
				autoHideDuration={700}
				vertical='top'
				horizontal='left'
			/>
			<SnackBar
				errorAlert={notCurrentPlayer}
				setErrorAlert={setNotCurrentPlayer}
				sucessAlert={false}
				setSucessAlert={() => { }}
				sucessMessage=""
				errorMessage="Espere sua vez de jogar"
				autoHideDuration={1500}
				vertical='top'
				horizontal='left'
			/>
			<div>
				<h2>Nome da sala: {room.roomName}</h2>
				<p>Round:{round}</p>
				<div className="card">
					<h3>Jogador 1: {room.player1 || 'aguardando...'}</h3>
					<h3>Jogador 2: {player2 || 'aguardando...'}</h3>
				</div>
				<div>
					<ColorButtons Sequence={Sequence}></ColorButtons>
				</div>
			</div>
		</div>
	);
};

export default CoopGame;
