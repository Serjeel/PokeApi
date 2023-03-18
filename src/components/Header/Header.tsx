import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setModalWindowAuthorizationShow } from '../../redux/actions';
import PokemonLogo from '../../images/PokemonLogo.png'
import './Header.scss';

function Header() {
    const dispatch = useDispatch();

    const isAuthorized = useSelector((state: any) => state.isAuthorized);
    const username = useSelector((state: any) => state.username);

    const loginButtonClick = () => {
        console.log("fgh");
        
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
                    <button>Favorites</button>
                    <button className="auth-button" onClick={() => exitButtonClick()}
                    >Выход</button>
                </>)}
                {(!isAuthorized && <button className="auth-button" onClick={() =>
                    loginButtonClick()}>Войти/Зарегистироватья</button>)}
            </div>
            <div className='header'>
                <img
                    src={PokemonLogo}
                    alt='pokemon-logo'
                    className='pokemon-logo'
                />
            </div>
        </>
    );
}

export default Header;
