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