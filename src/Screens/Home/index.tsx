// Modules
import React, { Fragment, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
// Components
import PokemonCard from './PokemonCard';
import Spinner from '../../common/Components/Spinner';
// Repository
import RepositoryPokemon from '../../repositories/PokemonRepository';
// Hooks
import useIntersectionObserver from '../../common/Hooks/useIntersectionObserver';

const PokemonRepository: RepositoryPokemon = new RepositoryPokemon();

const Home = () => {

    const loader = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(loader, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0
    });

    const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } = useInfiniteQuery('pokemons',
        PokemonRepository.getPokemons, {
        getNextPageParam: lastPage => lastPage.nextPage
    });

    if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
    }

    return (
        <div className='bg-gray-100 container h-screen overflow-x-hidden overflow-y-auto p-4'>

            <header className='my-10' onClick={() => fetchNextPage()}>
                <h1 className='font-bold text-3xl'>Pokedex</h1>
            </header>

            { isError && !data &&
                <h1>Deu erro</h1>
            }

            <Spinner
                classAfterLoad='absolute top-0 right-0 opacity-20  z-0'
                isLoading={isLoading}
            />

            { (!isLoading && !isError && data) &&
                <div className='gap-3 grid grid-cols-2 z-10'>
                    {data.pages.map((page, i) =>
                        <Fragment key={i}>
                            {page.pokemons.map(pokemon => {
                                return <PokemonCard pokemon={pokemon} key={pokemon.name} />
                            })}
                        </Fragment>
                    )}
                </div>
            }

            <div className={`${(!isLoading && hasNextPage) ? 'block' : 'hidden'} mx-auto pb-4 pt-8 w-12`} ref={loader}>
                <Spinner />
            </div>
        </div>
    )
};

export default Home;
