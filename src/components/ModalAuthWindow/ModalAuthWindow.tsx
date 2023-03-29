import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getAuthentification, getRegistration } from '../../api';
import CloseIcon from '../../images/close-icon.svg';
import { setModalWindowAuthorizationShow } from '../../redux/actions';
import './ModalAuthWindow.scss';

function ModalAuthWindow() {
    const dispatch: any = useDispatch();
    const modalWindowAuthorizationShow = useSelector((state: any) => state.modalWindowAuthorizationShow);
    const [selectedAuthorizationTab, setSelectedAuthorizationTab] = useState("login");

    const [logUsername, setLogUsername] = useState("");
    const [logPassword, setLogPassword] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regRepPassword, setRegRepPassword] = useState("");

    const loginTabClick = () => {
       setSelectedAuthorizationTab("login");
    }

    const registrationTabClick = () => {
    setSelectedAuthorizationTab("registration");
    }

    const closeIconClick = () => {
        dispatch(setModalWindowAuthorizationShow(false));
        setSelectedAuthorizationTab("login");

        setLogUsername("");
        setLogPassword("");
        setRegUsername("");
        setRegPassword("");
        setRegRepPassword("");
    }

    const handleButtonClick = () => {
        if (selectedAuthorizationTab === "login") {
            try {
                if (logUsername !== '' && logPassword !== '') {
                    const Authentification = async () => {
                        const data: any = await getAuthentification({
                            logUsername,
                            logPassword,
                            regUsername,
                            regPassword,
                            regRepPassword
                        });
                        if (data.success === true) {
                            setModalWindowAuthorizationShow(false)
                            Cookies.set('token', data.token);
                            window.location.reload();
                        } else {
                            alert(data.message)
                        }
                    }

                    Authentification();

                    setLogUsername("");
                    setLogPassword("");
                    setRegUsername("");
                    setRegPassword("");
                    setRegRepPassword("");
                } else {
                    alert('Введены не все значения!');
                }
            } catch {
                alert("Неверный логин или пароль")
            }
        } else {
            if (regUsername !== '' && regPassword !== '') {
                if (regPassword === regRepPassword) {
                    const Registration = async () => {
                        const data: any = await getRegistration({
                            logUsername,
                            logPassword,
                            regUsername,
                            regPassword,
                            regRepPassword
                        });

                        if (data.success === true) {
                            setSelectedAuthorizationTab("login");
                            alert('Вы успешно зарегистрировались!');
                        } else {
                            alert(data.message)
                        }
                    }

                    Registration();

                    setLogUsername(regUsername);
                    setLogPassword("");
                    setRegUsername("");
                    setRegPassword("");
                    setRegRepPassword("");
                } else {
                    alert('Пароли не совпадают!')
                }
            } else {
                alert('Введены не все значения!');
            }
        }
    }

    return (<>
        {modalWindowAuthorizationShow && <div className="modal-block">
            <div className="modal-authorization-window">
                <div className="modal-authorization-content">
                    <div className="modal-header-block">
                        <h3 className="modal-authorization-header">PokeApi</h3>
                        <img className="close-icon" alt="close-icon" src={CloseIcon} onClick={() => closeIconClick()} />
                    </div>
                    <div className="modal-tabs-authorization-block">
                        <div className="modal-authorization-tabs ">
                            <p className={selectedAuthorizationTab === "login" ? "tab-active" : "tab"}
                                onClick={() => loginTabClick()}>
                                Вход
                            </p>
                            <p className={selectedAuthorizationTab === "registration" ? " tab-active" :
                                "tab"} onClick={() => registrationTabClick()}>
                                Регистрация
                            </p>
                        </div>
                    </div>
                    <div className="input-block">
                        <input className="authorization-input" id="username" type="text" placeholder=
                            "Имя пользователя" value={selectedAuthorizationTab === "login"
                                ? logUsername : regUsername}
                            onChange={(e) => {
                                selectedAuthorizationTab === "login" ?
                                    setLogUsername(e.target.value) :
                                    setRegUsername(e.target.value)
                            }} />
                        <input className="authorization-input" type="password" id="password" placeholder=
                            "Пароль" value={selectedAuthorizationTab === "login"
                                ? logPassword : regPassword}
                            onChange={(e) => {
                                selectedAuthorizationTab === "login" ?
                                    setLogPassword(e.target.value) :
                                    setRegPassword(e.target.value)
                            }} />
                        {selectedAuthorizationTab === "registration" && <input className=
                            "authorization-input" type="password" id="repPassword" placeholder=
                            "Повторите пароль" value={regRepPassword}
                            onChange={(e) => setRegRepPassword(e.target.value)} />}
                    </div>
                    <button className="authorization-button" onClick={() => handleButtonClick()}>{selectedAuthorizationTab ===
                        "login" ? "Войти" : "Зарегистрироваться"}</button>
                </div>
            </div>
        </div >
        }
    </>
    );
}

export default ModalAuthWindow;
