import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './SelectedPokemon.scss';

const SelectedPokemon = () => {
    const allPokemons = useSelector((state: any) => state.allPokemons);
    const searchParams = useParams();
    const pokemonName = searchParams.pokemon;
    const pokemonInform = allPokemons.find((item: any) => item.name === pokemonName);

    return (
        <div className="selected-pokemon">
            <div className='image-block'>
                {allPokemons.length !== 0 &&
                    <img className='pokemon-image' src={pokemonInform.image} alt="pokemonImage" />
                }
            </div>
            {
                allPokemons.length !== 0 &&
                <div className='description-block'>
                    <h1 className='pokemon-name'>
                        {pokemonInform.name}
                    </h1>
                    <p>
                        Number: {pokemonInform.id}
                    </p>
                    <p>
                        Type: {pokemonInform.types}
                    </p>
                    <p>
                        Abilities: {pokemonInform.abilities}
                    </p>
                </div>
            }
        </div>
    );
}

export default SelectedPokemon;