import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import ContentLoader from "react-content-loader";
import { setFavorites } from "../../redux/actions";
import { getChangeFavorites } from '../../api/index';
import Favorites from '../../images/favorites.svg';
import FavoritesActive from '../../images/favorites-active.svg';

import './PokemonCard.scss'

interface Props {
  name: string
  image: any
  isFavorite: boolean
}

const PokemonCard = ({ name, image, isFavorite }: Props) => {

  let history = useNavigate();
  const dispatch: any = useDispatch();
  const favorites = useSelector((state: any) => state.favorites);

  const [inFavorites, setInfavorites] = useState(false);

  const goToDescription = () => {
    history(`/pokemons/${name}`);
  }

  const addToFavorites = () => {
    if (Cookies.get('token')) {
      let favoritesArray = [...favorites];
      getChangeFavorites(name).then((res: any) => {
        if (res.status === "added") {
          favoritesArray.push(name);
          dispatch(setFavorites(favoritesArray));
        } else {
          favoritesArray.splice(favoritesArray.indexOf(name), 1);
          dispatch(setFavorites(favoritesArray));
        }
      });
    } else {
      alert('Сначала нужно авторизоваться!')
    }
  }

  useEffect(() => {
    setInfavorites(isFavorite)
  }, [isFavorite])

  return (
    <div className='pokemon-card'>
      <div className="forClick" onClick={goToDescription}></div>
      <div className="image-block" >
        {image ?
          <img
            className='pokemon-image'
            src={image}
            alt={name}
            onClick={goToDescription}
          />
          : <ContentLoader
            speed={2}
            width={115}
            height={115}
            viewBox="0 0 90 90"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="50" cy="50" r="35" />
          </ContentLoader>
        }
        <img
          className='favorite-image'
          src={inFavorites ? FavoritesActive : Favorites}
          alt={name}
          onClick={addToFavorites}
        />
      </div>
      {
        name ?
          <h4 className='pokemon-name'>{name}</h4>
          : <ContentLoader
            speed={2}
            width={115}
            height={65}
            viewBox="0 0 180 30"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="12" y="8" rx="3" ry="3" width="150" height="20" /> 
          </ContentLoader>
      }
    </div>
  )
}

export default PokemonCard