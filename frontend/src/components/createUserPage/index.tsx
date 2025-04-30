import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './createUser.css';
import axios from 'axios';
import SnackBar from '../snackbar';
import ButtonLink from '../buttonLink';

const CreateUser = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [registerError, setRegisterError] = useState(false);
	const [registerSucess, setRegisterSucess] = useState(false);
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}user/register`, {
				userName,
				email,
				password,
			});
			setRegisterSucess(true);
			setRegisterError(false);
		} catch (error: any) {
			console.error(error.response?.data?.error || 'Erro ao criar usuário');
			setRegisterSucess(false);
			setRegisterError(true);
		}
	};
	return (
		<div className="create-user-container">
			<SnackBar
				errorAlert={registerError}
				setErrorAlert={setRegisterError}
				sucessAlert={registerSucess}
				setSucessAlert={setRegisterSucess}
				sucessMessage="Usuário Criado"
				errorMessage="Erro ao criar usuário"
			/>

			<div className="create-user-card">
				<h1 className="create-user-title">Cadastre-se</h1>

				<form className="create-user-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>E-mail</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email:"
						/>
					</div>
					<div className="form-group">
						<label>Nome de Usuário</label>
						<input
							type="text"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="Digite seu nome de usuário:"
						/>
					</div>
					<div className="form-group">
						<label>Senha</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha:"
						/>
					</div>
					<button type="submit" className="create-user-button">
						Criar Conta
					</button>
				</form>

				<p className="create-user-link">
					Já tem conta? <Link to="/login">Entrar</Link>
				</p>
				<ButtonLink buttontext="Voltar" to="/" id="backMenu" />
			</div>
		</div>
	);
};

export default CreateUser;
