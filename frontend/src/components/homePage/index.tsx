import 'intro.js/introjs.css';
import ButtonLink from '../buttonLink';
import './HomePage.css';
import ProfilePic from '../../assets/geniusLogo.svg';
import LogoutPic from '../../assets/logout.svg';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
	const { logged, userName, logout } = useAuth();

	return (
		<div className="HomePage">
			{logged ? (
				<div className="HomePage-Profile">
					<img src={ProfilePic} />
					
					<div className="HomePage-Profile-Buttons">
					<p id='logged'>{userName}</p>
						<button
							onClick={() => {
								logout();
							}}
						>
							<img src={LogoutPic} alt="" />
							Sair da conta
						</button>
					</div>
				</div>
			) : (
				<div />
			)}

			<h1>Genius Game</h1>
			<div className="GameModes">
				<ButtonLink buttontext="Solo Game" to="/soloGame" id="Solo-Game" />
				<ButtonLink buttontext="1 vs 1" to="/" id="One-vs-One" />
				<ButtonLink buttontext="Co-op" to="/coop" id="Co-op" />
				<ButtonLink buttontext="Conta" to="/register" id="Conta" />
			</div>
		</div>
	);
};

export default Home;
