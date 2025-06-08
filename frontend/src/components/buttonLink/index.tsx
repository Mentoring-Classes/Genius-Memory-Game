import { Link } from 'react-router-dom';
import '../buttonLink/ButtonLink.css';

interface ButtonLinkProps {
  buttontext: string;
  to: string;
  id?: string;
  onClick?: () => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ buttontext, to, id, onClick }) => {
  return (
    <Link to={to} id={id} className="Link" aria-label={buttontext} onClick={onClick}>
      {buttontext}
    </Link>
  );
};

export default ButtonLink;
