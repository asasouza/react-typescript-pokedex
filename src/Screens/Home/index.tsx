// Modules
import React from 'react';
import { useQuery } from 'react-query';
// Components
import PokemonCard from './PokemonCard';
import Spinner from '../../common/Components/Spinner';
// Repository
import RepositoryPokemon from '../../repositories/PokemonRepository';


const PokemonRepository: RepositoryPokemon = new RepositoryPokemon();

const Home = () => {

    const { data: pokemons, isError, isLoading } = useQuery('pokemons', PokemonRepository.getPokemons);
    
    return (
        <div className='bg-gray-100 container h-screen overflow-x-hidden overflow-y-auto p-4'>

            <header className='my-10'>
                <h1 className='font-bold text-3xl'>Pokedex</h1>
            </header>

            { isError && !pokemons &&
                <h1>Deu erro</h1>
            }

            <Spinner
                classAfterLoad='absolute top-0 right-0 opacity-20  z-0'
                isLoading={isLoading}
            />

            { (!isLoading && !isError && pokemons) &&
                <div className='gap-3 grid grid-cols-2 z-10'>
                    {pokemons.map((pokemon) => {
                        return <PokemonCard pokemon={pokemon} key={pokemon.name} />
                    })}
                </div>
            }
        </div>
    )
};

export default Home;
