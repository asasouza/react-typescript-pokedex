import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import PokeballSvg from '../../resources/pokeball.svg';

interface Pokemon {
    name: string,
    type: Array<string>,
    image: string,
}

// Utils
const upperCaseFirstLetter = (text: string): string => {
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
}

const Home = () => {
    //const [pokemonNumber, setPokemonNumber] = useState(0);

    const getPokemons = async () => {
        const pokemons: Array<Pokemon> = [];
        for (let i = 1; i < 10; i++) {
            const { data, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (status !== 200) {
                throw new Error('Ocorreu um erro no fetch da api');
            }
            pokemons.push({
                name: upperCaseFirstLetter(data.name),
                type: data.types.map((type: { type: { name: string; }; }) => upperCaseFirstLetter(type.type.name)),
                image: data.sprites.other['official-artwork'].front_default
            });
        }
        return pokemons;
    }

    const { data: pokemons, isError, isLoading } = useQuery('pokemons', getPokemons);
    console.log(pokemons, isError, isLoading);
    return (
        <div className='bg-gray-100 flex-grow h-screen overflow-scroll p-4'>

            <img alt='' className='absolute -m-10 opacity-20 -right-6 -top-6 z-0' src={PokeballSvg} />

            <header className='my-10'>
                <h1 className='font-bold text-3xl'>Pokedex</h1>
            </header>

            { isError && !pokemons &&
                <h1>Deu erro</h1>
            }

            { isLoading && !pokemons &&
                <h2>Ta carregando...</h2>
            }

            { (!isLoading && !isError && pokemons) &&
                <div className='gap-3 grid grid-cols-2 z-10'>
                    {pokemons.map((pokemon) => {
                        return (
                            <div className='bg-green-300 relative overflow-hidden rounded-3xl shadow-md text-white p-3' key={pokemon.name}>
                                <p className='font-semibold mb-3 text-xl'>{pokemon.name}</p>
                                <div className='flex flex-row justify-between'>
                                    <div className='flex flex-col'>
                                        {pokemon.type.map(type => {
                                            return (
                                                <span className='bg-green-500 bg-opacity-40 mb-2 mr-2 px-2 py-1 rounded-3xl shadow text-sm'>{type}</span>
                                            )
                                        })
                                        }
                                    </div>
                                    <img alt='Bulbassaur' className='-mt-5 w-24 z-10' src={pokemon.image} />
                                </div>
                                <img alt='' className='absolute -bottom-10 opacity-50 -right-10 w-44 z-0' src={PokeballSvg} />
                            </div>
                        )
                    })}
                </div>
            }


        </div>
    )
};

export default Home;
