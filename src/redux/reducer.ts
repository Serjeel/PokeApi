import Cookies from 'js-cookie';
import Decode from "jwt-decode"
import { AnyAction } from 'redux';
import constants from './constans';

const token = Cookies.get('token');

const initialState = {
  allPokemons: [],
  username: token ? Decode<any>(token).username : "",
  favorites: [],
  isAuthorized: false,
  modalWindowAuthorizationShow: false
}

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.SET_ALL_POKEMONS:
      return { ...state, allPokemons: action.payload }
    case constants.GET_ALL_POKEMONS:
      return { ...state, allPokemons: action.payload }
    case constants.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    case constants.SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload }
    case constants.SET_MODAL_WINDOW_AUTHORIZATION_SHOW:
      return { ...state, modalWindowAuthorizationShow: action.payload }
    default:
      return state;
  }
};