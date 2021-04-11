// Modules
import React, { Fragment, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
// @ts-ignore
import { MotionScreen } from 'react-motion-layout';
// Components
import PokemonCard from './PokemonCard';
import Spinner from '../../common/Components/Spinner';
// Repository
import RepositoryPokemon from '../../repositories/PokemonRepository';
// Hooks
import useIntersectionObserver from '../../common/Hooks/useIntersectionObserver';
// Resources
import './style.css';

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
        <MotionScreen>
            <div className='bg-gray-100 h-screen max-w-md mx-auto overflow-x-hidden p-4 relative'>
                <header className='my-10' onClick={() => fetchNextPage()}>
                    <h1 className='font-bold text-3xl'>Pokédex</h1>
                </header>

                {isError && !data &&
                    <h1>Deu erro</h1>
                }

                <Spinner
                    classAfterLoad='animate-slide-up'
                    isLoading={isLoading}
                />

                {(!isLoading && !isError && data) &&
                    <div className='gap-3 grid grid-cols-2 z-10'>
                        {data.pages.map((page, i) =>
                            <Fragment key={i} >
                                {page.pokemons.map(pokemon => {
                                    return (
                                        <div key={pokemon.id} className='animate-fade-in'>
                                            <PokemonCard pokemon={pokemon} />
                                        </div>
                                    )
                                })}
                            </Fragment>
                        )}
                    </div>
                }

                <div className={`${(!isLoading && hasNextPage) ? 'block' : 'hidden'} mx-auto pb-4 pt-8 w-12`} ref={loader}>
                    <Spinner />
                </div>
            </div>
        </MotionScreen>
    )
};

export default Home;
