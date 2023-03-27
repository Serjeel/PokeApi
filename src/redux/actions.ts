import constants from './constans';
import axios from "axios";
import { Dispatch } from 'react';
//require('dotenv').config()

export const setAllPokemons = (allPokemons: Array<object>) => ({
    type: constants.SET_ALL_POKEMONS,
    payload: allPokemons
});
export const getAllPokemons = () => async (dispatch: Dispatch<StorageEvent | any>) => {

    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100').then(res => {
        const urls = res.data.results.map((res: any) =>
            axios.get(res.url));
        const pokemonsInform: Array<object> = [];
        Promise.all(urls).then((res) => {
            res.map((resInfo) => {
                pokemonsInform.push({
                    'types': (resInfo.data.types.map((item: any) => item.type.name)).join(', '),
                    'abilities': (resInfo.data.abilities.map((item: any) => item.ability.name)).join(', '),
                    'image': resInfo.data.sprites.other.dream_world.front_default,
                    'name': resInfo.data.name,
                    'id': resInfo.data.id
                })
            });
            dispatch({
                type: constants.GET_ALL_POKEMONS,
                payload: pokemonsInform
            })
            setAllPokemons(pokemonsInform)
        }).catch((e) => console.log(e))
    }).catch((e) => console.log(e))
}

export const setSelectedPokemons = (selectedPokemons: any) =>
({
    type: constants.SET_SELECTED_POKEMONS,
    payload: selectedPokemons
});

export const setFavorites = (favorites: Array<string>) =>
({
    type: constants.SET_FAVORITES,
    payload: favorites
});

export const setIsAuthorized = (isAuthorized: boolean) =>
({
    type: constants.SET_IS_AUTHORIZED,
    payload: isAuthorized
});

export const setModalWindowAuthorizationShow = (modalWindowAuthorizationShow: boolean) => ({
    type: constants.SET_MODAL_WINDOW_AUTHORIZATION_SHOW,
    payload: modalWindowAuthorizationShow
});

export const setSearchInputData = (searchInputData: string) => ({
    type: constants.SET_SEARCH_INPUT_DATA,
    payload: searchInputData
});


export const setContentAmount = (contentAmount: number) => ({
    type: constants.SET_CONTENT_AMOUNT,
    payload: contentAmount
});

export const setPageNumber = (pageNumber: number) => ({
    type: constants.SET_PAGE_NUMBER,
    payload: pageNumber
});
