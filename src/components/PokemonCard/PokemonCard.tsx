import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { setFavorites } from "../../redux/actions";
import { getChangeFavorites } from '../../api/index';
import Favorites from '../../images/favorites.svg';
import FavoritesActive from '../../images/favorites-active.svg';

import './PokemonCard.scss'
import { useState } from "react";

interface Props {
  name: string
  image: any
}

const PokemonCard = ({ name, image }: Props) => {
  let history = useNavigate();
  const dispatch: any = useDispatch();
  const favorites = useSelector((state: any) => state.favorites);

  const [inFavorites, setInfavorites] = useState(favorites.includes(name));

  const goToDescription = () => {
    history(`/pokemons/${name}`);
  }

  const addToFavorites = () => {
    if (Cookies.get('token')) {
      let favoritesArray = [...favorites];
      getChangeFavorites(name).then((res: any) => {
        if (res.status === "added") {
          console.log(res);
          favoritesArray.push(name);
          dispatch(setFavorites(favoritesArray));
          setInfavorites(true);
        } else {
          console.log(favoritesArray.indexOf(name));

          favoritesArray.splice(favoritesArray.indexOf(name) - 1, 1);
          dispatch(setFavorites(favoritesArray));
          setInfavorites(false);
        }
      });
    } else {
      alert('Сначала нужно авторизоваться!')
    }
  }

  return (
    <div className='pokemon-card'>
      <div className="forClick" onClick={goToDescription}></div>
      <div className="image-block" >
        <img
          className='pokemon-image'
          src={image}
          alt={name}
          onClick={goToDescription}
        />
        <img
          className='favorite-image'
          src={inFavorites ? FavoritesActive : Favorites}
          alt={name}
          onClick={addToFavorites}
        />
      </div>
      <h4 className='pokemon-name'>{name}</h4>
    </div>
  )
}

export default PokemonCard