import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import './AllPokemons.scss';

const AllPokemons = () => {
    let history = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [contentAmount, setContentAmount] = useState(10);
    const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || 1);
    const [pageCount, setPageCount] = useState(1);

    const allPokemons = useSelector((state: any) => state.allPokemons);
    const favorites = useSelector((state: any) => state.favorites);
    const [selectedPokemons, setSelectedPokemons]: any = useState([]);

    const [searchInputData, setSearchInputData] = useState('');
    
    const arr: any = () => {
        let array = [];
        for (let i = 0; i < 9; i++) {
            array.push({
                name: "",
                image: ""
            })
        }
        return array;
    }


    useEffect(() => {
        console.log(selectedPokemons);

        if (searchInputData) {
            let searchArray: any = [];

            for (let i = 0; i < allPokemons.length; i++) {
                if (allPokemons[i].name.includes(searchInputData)) {
                    searchArray.push(allPokemons[i]);
                }
            }

            let subArray: any = [];
            for (let i = 0; i < Math.ceil(searchArray.length / contentAmount); i++) {
                subArray[i] = searchArray.slice((i * contentAmount), (i * contentAmount) + contentAmount);
            }
            setSelectedPokemons(subArray);
            setPageCount(subArray.length);
            setPageNumber(1);
            history(`/allPokemons/?page=1&amount=${contentAmount}`);
        } else {
            let subArray: any = [];
            for (let i = 0; i < Math.ceil(allPokemons.length / contentAmount); i++) {
                subArray[i] = allPokemons.slice((i * contentAmount), (i * contentAmount) + contentAmount);
            }
            setSelectedPokemons(subArray);
            setPageCount(subArray.length);
        }
        console.log(selectedPokemons);

    }, [allPokemons, contentAmount, searchInputData])

    useEffect(() => {
        let subArray: any = [];
        for (let i = 0; i < Math.ceil(allPokemons.length / contentAmount); i++) {
            subArray[i] = allPokemons.slice((i * contentAmount), (i * contentAmount) + contentAmount);
        }

        if (allPokemons.length) {

            if (!searchParams.get('amount') || !searchParams.get('page') || subArray.length < pageNumber) {
                history('/allPokemons/?page=1&amount=10');
                setPageNumber(1);
                setContentAmount(10);
            } else if (Number(searchParams.get('amount')) === 10 || Number(searchParams.get('amount'))
                === 20 || Number(searchParams.get('amount')) === 50) {

                setPageNumber(Number(searchParams.get('page')));
                setContentAmount(Number(searchParams.get('amount')));
            } else {
                history('/allPokemons/?page=1&amount=10');
                setPageNumber(1);
                setContentAmount(10);
            }
        }
    }, [allPokemons])

    return (
        <>
            <div className="allPokemons-main">
                <div className='pokemons'>
                    <div className='pokemons-block'>
                        {
                            selectedPokemons.length !== 0 ? selectedPokemons[pageNumber - 1].map((pokemon: any, index: number) =>
                                <PokemonCard
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    key={index}
                                    isFavorite={favorites.includes(pokemon.name)}
                                />
                            )
                                :
                                arr().map((pokemon: any, index: number) =>
                                    <PokemonCard
                                        name={pokemon.name}
                                        image={pokemon.image}
                                        key={index}
                                        isFavorite={favorites.includes(pokemon.name)}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllPokemons;