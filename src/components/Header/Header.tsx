import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setModalWindowAuthorizationShow, setSearchInputData } from '../../redux/actions';
import PokemonLogo from '../../images/PokemonLogo.png'
import './Header.scss';

function Header() {
    const dispatch = useDispatch();
    let history = useNavigate();

    const isAuthorized = useSelector((state: any) => state.isAuthorized);
    const username = useSelector((state: any) => state.username);
    const searchParams = useLocation();

    const pokemonLogoClick = () => {
        if (searchParams.pathname !== '/allPokemons/') {
            history(`/allPokemons/?page=1&amount=10`);
            dispatch(setSearchInputData(''));
        }
    }

    const favoritesButtonClick = () => {
        history(`/favorites/?page=1&amount=10`);
        dispatch(setSearchInputData(''));
    }

    const loginButtonClick = () => {
        dispatch(setModalWindowAuthorizationShow(true));
    }

    const exitButtonClick = () => {
        Cookies.remove("token");
        window.location.reload();
    }

    return (
        <>
            <div className="auth-button-block">
                {isAuthorized && (<>
                    <p className="username">{username}</p>
                    {searchParams.pathname !== '/favorites/' && <button className="header-button"
                        onClick={favoritesButtonClick}>Favorites</button>}
                    <button className="header-button" onClick={() => exitButtonClick()}
                    >Logout</button>
                </>)}
                {(!isAuthorized && <button className="auth-button" onClick={() =>
                    loginButtonClick()}>Login/Register</button>)}
            </div>
            <div className='header'>
                <img
                    src={PokemonLogo}
                    alt='pokemon-logo'
                    className='pokemon-logo'
                    onClick={pokemonLogoClick}
                />
            </div>
        </>
    );
}

export default Header;
