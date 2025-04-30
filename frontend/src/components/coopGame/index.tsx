import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const CoopGame = () => {
	const { id } = useParams();
	const [room, setRoom] = useState<any>();

	useEffect(() => {
		const token = cookies.get('token');

		axios
			.get(`${import.meta.env.VITE_API_URL}coopRoom/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setRoom(res.data);
			})
			.catch((err) => {
				console.error(err);
				setRoom(null);
			});
	}, [id]);

	if (!room) return <p>Erro ao carregar sala.</p>;

	return (
		<div>
			<h1>SALA AQUIIIIII</h1>
			<div>
				<h2>Nome da sala: {room.roomName}</h2>

				<div className="card">
					<h3>Jogador 1: {room.player1 || 'aguardando...'}</h3>
					<h3>Jogador 2: {room.player2 || 'aguardando...'}</h3>
				</div>
			</div>
		</div>
	);
};

export default CoopGame;
