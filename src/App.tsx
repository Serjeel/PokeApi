import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

import { getAllPokemons, setIsAuthorized, setFavorites } from "./redux/actions";
import { getAuthorization } from './api';

import AllPokemons from "./pages/AllPokemons/AllPokemons";
import SelectedPokemon from "./pages/SelectedPokemon/SelectedPokemon";
import Header from "./components/Header/Header";
import ModalWindowAuthorization from "./components/ModalAuthWindow/ModalAuthWindow";
import Favorites from "./pages/Favorites/Favorites";

import './App.scss';

const App = () => {
  let history = useNavigate();
  //require('dotenv').config()

  const dispatch: any = useDispatch();

  const Authorization = async () => {
    const auth: any = await getAuthorization();
    console.log(auth);

    if (auth.success) {
      dispatch(setIsAuthorized(auth.success));
      dispatch(setFavorites(auth.favorites));
    } else {
      Cookies.remove("token");
    }
  }

  useEffect(() => {
    Authorization()
    dispatch(getAllPokemons());
  }, [])

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/allPokemons' element={<AllPokemons />} />
        <Route path='/pokemons/:pokemon' element={<SelectedPokemon />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route
          path="*"
          element={<Navigate to="/allPokemons/?page=1&amount=10" replace />}
        />
      </Routes>
      <div className="modal-block">
        <ModalWindowAuthorization />
      </div>
      <div className="footer">
        <span className="footer-content">Created by <a href="https://github.com/Serjeel">Sergey Prusakov</a></span>
      </div>
    </div>
  );
}

export default App;
