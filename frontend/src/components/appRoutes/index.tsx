import { Routes, Route } from 'react-router-dom';
import Home from '../homePage';
import SoloGame from '../soloGame';
import CreateUser from '../createUserPage';
import LoginPage from '../loginPage';
import NotFound from '../notFound';
import CoopRoom from '../coopRoom';
import CoopGame from '../coopGame';

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/register" element={<CreateUser />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/soloGame" element={<SoloGame />} />
			<Route path="/coopGame/:id" element={<CoopGame />} />
			<Route path="/coop" element={<CoopRoom />} />
		</Routes>
	);
};

export default AppRoutes;
