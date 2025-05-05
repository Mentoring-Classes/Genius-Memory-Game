import RoomForm from '../roomForm';
import ButtonLink from '../buttonLink';
import './coopRoom.css';
import { useAuth } from '../../hooks/useAuth';

const CoopRoom = () => {
	const { logged } = useAuth();

	return (
		<div className="coopRoom">
			{logged ? (
				<RoomForm />
			) : (
				<div className="notLoggedIn">
					<p>Faça login primeiro</p>
					<ButtonLink buttontext="Voltar" to="/"></ButtonLink>
				</div>
			)}
		</div>
	);
};

export default CoopRoom;
