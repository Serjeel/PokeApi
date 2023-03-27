import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie';
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import './Favorites.scss';
import PageInterface from "../../components/PageInterface/PageInterface";
import Pokemons from "../../components/Pokemons/Pokemons";

const Favorites = () => {

  return (
    <>
      <PageInterface target="favorites" />
      <Pokemons target="favorites" />
    </>
  );
}

export default Favorites;