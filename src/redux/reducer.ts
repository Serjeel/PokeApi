import Cookies from 'js-cookie';
import Decode from "jwt-decode"
import { AnyAction } from 'redux';
import constants from './constans';

const token = Cookies.get('token');

const initialState = {
  allPokemons: [],
  selectedPokemons: [],
  username: token ? Decode<any>(token).username : "",
  favorites: [],
  isAuthorized: false,
  modalWindowAuthorizationShow: false,
  searchInputData: "",
  contentAmount: 10,
  pageNumber: 1
}

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case constants.SET_ALL_POKEMONS:
      return { ...state, allPokemons: action.payload }
    case constants.GET_ALL_POKEMONS:
      return { ...state, allPokemons: action.payload }

      case constants.SET_SELECTED_POKEMONS:
      return { ...state, selectedPokemons: action.payload }

    case constants.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    case constants.SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload }
    case constants.SET_MODAL_WINDOW_AUTHORIZATION_SHOW:
      return { ...state, modalWindowAuthorizationShow: action.payload }
    case constants.SET_SEARCH_INPUT_DATA:
      return { ...state, searchInputData: action.payload }
    case constants.SET_CONTENT_AMOUNT:
      return { ...state, contentAmount: action.payload }
    case constants.SET_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload }
    default:
      return state;
  }
};