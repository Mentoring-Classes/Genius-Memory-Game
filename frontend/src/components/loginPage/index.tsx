import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SnackBar from '../snackbar';
import './login.css';
import Cookies from 'universal-cookie';
import ButtonLink from '../buttonLink';

const cookies = new Cookies();

const loginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);
	const [loginSucess, setLoginSucess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}user/login`,
				{
					email,
					password,
				},
			);

			cookies.set('token', response.data.token);

			setLoginError(false);
			navigate('/');
		} catch (error: any) {
			setLoginSucess(false);
			setLoginError(true);
		}
	};
	return (
		<div className="login-container">
			<SnackBar
				errorAlert={loginError}
				setErrorAlert={setLoginError}
				sucessAlert={loginSucess}
				setSucessAlert={setLoginSucess}
				sucessMessage="Login feito com sucesso"
				errorMessage="Erro ao fazer login"
			/>

			<div className="login-card">
				<h1 className="login-title">Entrar</h1>

				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>E-mail</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email:"
							required
						/>
					</div>

					<div className="form-group">
						<label>Senha</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha:"
							required
						/>
					</div>

					<button type="submit" className="login-button">
						Entrar
					</button>
				</form>

				<p className="login-link">
					Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
				</p>
				<ButtonLink buttontext="Voltar" to="/" id="backMenu" />
			</div>
		</div>
	);
};

export default loginPage;
