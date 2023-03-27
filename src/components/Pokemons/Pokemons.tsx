import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie';
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { setPageNumber, setContentAmount, setSelectedPokemons } from "../../redux/actions";
import './Pokemons.scss';

interface Props {
    target: string
}

const Pokemons = ({ target }: Props) => {
    let history = useNavigate();
    const dispatch: any = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const contentAmount = useSelector((state: any) => state.contentAmount);
    const pageNumber = useSelector((state: any) => state.pageNumber);

    const allPokemons = useSelector((state: any) => state.allPokemons);
    const favorites = useSelector((state: any) => state.favorites);
    const [favoritesArray, setFavoritesArray]: any = useState([]);
    const selectedPokemons = useSelector((state: any) => state.selectedPokemons);
    const searchInputData = useSelector((state: any) => state.searchInputData);
    const [notFoundText, setNotFoundText] = useState("");

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
        if (target === "favorites") {
            if (!Cookies.get('token')) {
                alert('Сначала нужно авторизоваться!');
                history(`/allPokemons/?page=1&amount=10`);
            } else {
                let array: any = [];
                allPokemons.map((pokemon: any) => {
                    favorites.map((favoritePokemon: any) => {
                        if (favoritePokemon === pokemon.name) {
                            array.push(pokemon);
                        }
                    })
                })
                setFavoritesArray(array)
            }
        }
    }, [allPokemons])

    useEffect(() => {
        if (searchInputData) {
            let searchArray: any = [];

            if (target === "allPokemons") {
                for (let i = 0; i < allPokemons.length; i++) {
                    if (allPokemons[i].name.includes(searchInputData)) {
                        searchArray.push(allPokemons[i]);
                    }
                }
            }

            if (target === "favorites") {
                for (let i = 0; i < favoritesArray.length; i++) {
                    if (favoritesArray[i].name.includes(searchInputData)) {
                        searchArray.push(favoritesArray[i]);
                    }
                }
            }

            let subArray: any = [];
            for (let i = 0; i < Math.ceil(searchArray.length / contentAmount); i++) {
                subArray[i] = searchArray.slice((i * contentAmount), (i * contentAmount) + contentAmount);
            }
            dispatch(setSelectedPokemons(subArray));
            dispatch(setPageNumber(1));
            history(`/${target}/?page=1&amount=${contentAmount}`);
        } else {
            let subArray: any = [];
            if (target === "allPokemons") {
                for (let i = 0; i < Math.ceil(allPokemons.length / contentAmount); i++) {
                    subArray[i] = allPokemons.slice((i * contentAmount), (i * contentAmount) + contentAmount);
                }
            }

            if (target === "favorites") {
                for (let i = 0; i < Math.ceil(favoritesArray.length / contentAmount); i++) {
                    subArray[i] = favoritesArray.slice((i * contentAmount), (i * contentAmount) + contentAmount);
                }
            }
            dispatch(setSelectedPokemons(subArray));
            console.log(subArray);
        }

    }, [allPokemons, favoritesArray, contentAmount, searchInputData])

    useEffect(() => {
        console.log(1);

        let subArray: any = [];
        if (target === "allPokemons") {
            for (let i = 0; i < Math.ceil(allPokemons.length / contentAmount); i++) {
                subArray[i] = allPokemons.slice((i * contentAmount), (i * contentAmount) + contentAmount);
            }
        }

        if (target === "favorites") {
            for (let i = 0; i < Math.ceil(favoritesArray.length / contentAmount); i++) {
                subArray[i] = favoritesArray.slice((i * contentAmount), (i * contentAmount) + contentAmount);
            }
        }

        if (!searchParams.get('amount') || !searchParams.get('page') || subArray.length < pageNumber) {
            history(`/${target}/?page=1&amount=10`);
            dispatch(setPageNumber(1));
            dispatch(setContentAmount(10));
        } else if (Number(searchParams.get('amount')) === 10 || Number(searchParams.get('amount'))
            === 20 || Number(searchParams.get('amount')) === 50) {

            dispatch(setPageNumber(Number(searchParams.get('page'))));
            dispatch(setContentAmount(Number(searchParams.get('amount'))));
        } else {
            history(`/${target}/?page=1&amount=10`);
            dispatch(setPageNumber(1));
            dispatch(setContentAmount(10));
        }


    }, [target === "favorites" ? favoritesArray : allPokemons])

    return (
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
                            : searchInputData.length !== 0 ?
                                <span className="notFound">Ничего не найдено</span>
                                : arr().map((pokemon: any, index: number) =>
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
    );
}

export default Pokemons;