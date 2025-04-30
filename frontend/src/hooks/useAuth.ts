import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useAuth = () => {
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    axios.get(`${import.meta.env.VITE_API_URL}verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setLogged(true);
      setUserName(res.data.user.userName);
    })
    .catch((err) => {
      console.error("Token inválido ou erro na verificação:", err);
      cookies.remove('token', { path: '/' });
      setLogged(false);
    });
  }, []);

  const logout = () => {
    cookies.remove('token', { path: '/' });
    setLogged(false);
    setUserName(null);
  };

  return { logged, userName, logout };
};
