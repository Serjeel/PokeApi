import PageInterface from "../../components/PageInterface/PageInterface";
import Pokemons from "../../components/Pokemons/Pokemons";

const AllPokemons = () => {

  return (
    <>
      <PageInterface target="allPokemons" />
      <Pokemons target="allPokemons" />
    </>
  );
}

export default AllPokemons;