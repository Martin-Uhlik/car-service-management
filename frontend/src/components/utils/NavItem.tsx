import { Link, useNavigate } from "react-router-dom";
import { mdiArrowLeft } from '@mdi/js';
import { useSetRecoilState } from "recoil";
import { loginStatusAtom } from "../../state/atoms";

export interface NavItemProps {
  to? : string;
  img?: JSX.Element;
  logout: boolean;
  text: string;
}

export const NavItem = ({ to, img, text, logout }: NavItemProps) => {
  const changeLoginSate = useSetRecoilState(loginStatusAtom);
  const navigate = useNavigate();

  const logoutFn = () => {
    changeLoginSate({
      role: 'none',
      name: '',
      surname: '',
      email: '',
      phone: '',
      token: '',
    });
    navigate('/');
  }

  if (logout === true) {
    return (
      <a className="aside_item" onClick={logoutFn}>
        {img != undefined && img}
        <span>{text}</span>
      </a>
    ); 
    
  } else if ( to === undefined ) {
    return (
      <a href="javascript:history.back()" className="aside_item">
        <svg className="icon" viewBox="0 0 24 24">
            <path fill="currentColor" d={ mdiArrowLeft } />
        </svg>
        <span>Zpět</span>
      </a>
    );
  }
  return (
    <Link to={to} className="aside_item">
        {img != undefined && img}
        <span>{text}</span>
    </Link>
  );
}

NavItem.defaultProps = {
  logout: false,
}