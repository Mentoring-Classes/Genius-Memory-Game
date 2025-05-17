import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import io from 'socket.io-client';
import './coopGame.css';
import ColorButtons from '../ColorButtons';
import { useAuth } from '../../hooks/useAuth';
import SnackBar from '../snackbar';

const cookies = new Cookies();
const socket = io(import.meta.env.VITE_API_URL);

const CoopGame = () => {
	const { id } = useParams();
	const [room, setRoom] = useState<any>(null);
	const { userName } = useAuth();
	const [player2, setPlayer2] = useState<any>(null);
	const [playerJoined, setPlayerJoined] = useState<boolean>(false);
	const [playerJoinedMessage, setPlayerJoinedMessage] = useState<string>('');
	const [gameColorChoices, setGameColorChoices] = useState<Room['gameSequence']>([]);

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
			console.log("Mensagem do socket.io:", data);
			setPlayer2(data.player2);
			setGameColorChoices(data.gameSequence);
			setRoom(data);
		});

		socket.on('player_joined', (data) => {
			console.log(data.message);
			setPlayerJoinedMessage(data.message);
			setPlayerJoined(true);
		});

		return () => {
			socket.off('receive_data');
			socket.off('player_joined');
		};
	}, [id]);

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

	if (!room) return <p>Erro ao carregar sala.</p>;
	
	const Sequence = async (colorChosenByPlayer: string) => {
		socket.emit('playerClicked', { userName, colorChosenByPlayer, room });
	};
	return (
		<div className='coopGame'>
			<h1>SALA AQUIIIIII</h1>
			<SnackBar
				errorAlert={false}
				setErrorAlert={() => {}}
				sucessAlert={playerJoined}
				setSucessAlert={setPlayerJoined}
				sucessMessage={playerJoinedMessage}
				errorMessage="Erro ao conectar"
			/>
			<div>
				<h2>Nome da sala: {room.roomName}</h2>

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
