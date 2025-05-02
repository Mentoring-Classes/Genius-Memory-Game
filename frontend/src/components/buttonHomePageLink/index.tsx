import { Link } from 'react-router-dom';
import '../buttonHomePageLink/ButtonHomePageLink.css';

interface ButtonLinkProps {
  buttontext: string;
  to: string;
  id?: string;
  className: string;
}

const ButtonHomePageLink: React.FC<ButtonLinkProps> = ({ buttontext, to, id, className}) => {
  return (
    <Link to={to} id={id} className={className} aria-label={buttontext}>
      {buttontext}
    </Link>
  );
};

export default ButtonHomePageLink;
