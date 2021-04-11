// Modules
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
// @ts-ignore
import { SharedElement, MotionScene, MotionScreen } from 'react-motion-layout';
// Components
import Tag from '../../common/Components/Tag';
import Spinner from '../../common/Components/Spinner';
// Models
import Pokemon from '../../models/Pokemon';
// Repository
import RepositoryPokemon from '../../repositories/PokemonRepository';
// Utils
import { kebabCase } from '../../common/Utils/StringUtils';
// Resources
import PokeballSvg from '../../common/Resources/pokeball.svg';
import Arrow from '../../common/Resources/arrow.svg';

import './style.css';

const PokemonRepository: RepositoryPokemon = new RepositoryPokemon();

interface IParams {
    pokemonName: string,
}

const Details = () => {

    const [tab, setTab] = useState('about');
    const queryClient = useQueryClient();

    const { pokemonName } = useParams<IParams>();

    const { data: pokemon, isLoading } = useQuery(['pokemon', pokemonName],
        () => PokemonRepository.getPokemon(pokemonName),
        {
            initialData: () => {
                const pokemonsList = queryClient.getQueryData<{ pages: Array<any> }>('pokemons')?.pages.reduce((acc, page) => {
                    return [...acc, ...page.pokemons];
                }, []);
                if (!pokemonsList) {
                    return undefined;
                }
                const pokemon = pokemonsList.find((pokemon: Pokemon) => kebabCase(pokemon.name) === pokemonName);
                return pokemon;
            }
        }
    );

    if (!pokemon || isLoading) {
        return (
            <div className='bg-gray-100 flex h-screen items-center justify-center w-full'>
                <Spinner />
            </div>
        )
    }

    const renderCurrentTab = (tab: string) => {
        if (!pokemon.stats) {
            return (
                <div className='block mt-10 mx-auto w-20 '>
                    <Spinner />
                </div>
            );
        }
        switch (tab) {
            case 'about':
                return <AboutContainer pokemon={pokemon} />;
            case 'stats':
                return <StatsContainer pokemon={pokemon} />;
            case 'evolution':
                return <EvolutionContainer pokemon={pokemon} />;
        }
    }

    const renderTypes = (types: string[]) => {
        return types.map(type => {
            return (
                <Tag
                    backgroundColor={pokemon.tagClassByType}
                    key={type}
                    size='lg'
                    text={type}
                />
            )
        })
    }

    return (
        <MotionScreen>
            <MotionScene name={pokemon.name} easing="cubic-bezier(0.22, 1, 0.36, 1)">
                <div className={`${pokemon.backgroundClassByType || 'bg-gray-700'} flex flex-col h-screen max-w-md mx-auto overflow-x-hidden relative`}>
                    <div className='-mb-12 p-4 relative text-white'>
                        <Link className='inline-block pr-2 py-2' to='/'>
                            <img alt='Go Back' className='w-6' src={Arrow} />
                        </Link>
                        <div className='flex items-center justify-between mb-14'>
                            <div>
                                <p className=' font-semibold py-5 text-4xl'>{pokemon.name}</p>
                                <div>
                                    {renderTypes(pokemon.types)}
                                </div>
                            </div>
                            <p className='font-semibold text-2xl'>{`#${pokemon.id.toLocaleString(undefined, { minimumIntegerDigits: 3 })}`}</p>
                        </div>
                        <SharedElement.Image
                            alt={pokemon.name}
                            animationKey='image'
                            className='h-52 mx-auto relative w-52 z-10'
                            src={pokemon.image}
                        />

                        <img alt='' className='absolute -bottom-11 -right-12 opacity-20 w-72 z-0' src={PokeballSvg} />
                    </div>

                    <div className='animate-slide-up-in bg-white flex-1 px-4 rounded-t-3xl shadow-inner'>
                        <div className='flex items-center justify-between pt-12 pb-8'>
                            <Tab
                                active={tab === 'about'}
                                onClick={() => setTab('about')}
                                text='About'
                            />
                            <Tab
                                active={tab === 'stats'}
                                onClick={() => setTab('stats')}
                                text='Base Stats'
                            />
                            <Tab
                                active={tab === 'evolution'}
                                onClick={() => setTab('evolution')}
                                text='Evolution'
                            />
                        </div>
                        <div>
                            {renderCurrentTab(tab)}
                        </div>
                    </div>
                </div>
            </MotionScene>
        </MotionScreen>
    );
}

interface ITab {
    active?: boolean;
    onClick?(): void;
    text: string;
}

const Tab = (props: ITab) => {
    const { active, onClick, text } = props;
    return (
        <div className='cursor-pointer' onClick={onClick}>
            <p className={`font-bold mb-3 px-1 text-lg ${active ? 'text-gray-800' : 'text-gray-400'}`}>
                {text}
            </p>
            { active &&
                <div className='border border-purple-600' />
            }
        </div>
    );
}

const AboutContainer = ({ pokemon }: { pokemon: Pokemon }) => {
    const { about } = pokemon;
    return (
        <table className='text-gray-400 font-semibold'>
            <tbody>
                <tr>
                    <td className='pb-3 pr-10'>Height</td>
                    <td className='font-bold pb-3 text-gray-800'>{about?.height ? ((about?.height * 10) / 100).toFixed(2) : 0}m</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Weight</td>
                    <td className='font-bold pb-3 text-gray-800'>{about?.weight ? ((about?.weight * 100) / 1000).toFixed(2) : 0}kg</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Abilities</td>
                    <td className='font-bold pb-3 text-gray-800'>{about?.abilities}</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Base Experience</td>
                    <td className='font-bold pb-3 text-gray-800'>{about?.base_experience}xp</td>
                </tr>
            </tbody>
        </table>
    )
}

const StatsContainer = ({ pokemon }: { pokemon: Pokemon }) => {
    const { stats } = pokemon;
    return (
        <table className='text-gray-400 font-semibold mb-4'>
            <tbody>
                {stats?.map((stat, i) => {
                    return (
                        <tr key={stat.name}>
                            <td className='pb-3 pr-10'>{stat.name}</td>
                            <td className='font-bold pb-3 text-gray-800 pr-3'>{stat.value}</td>
                            <td className='relative w-full pb-2'>
                                <div style={{ width: `${stat.value}%` }} className={`absolute border ${i % 2 === 0 ? 'border-green-700' : 'border-red-700'} max-w-full z-10`} />
                                <div className='absolute border border-gray-100 w-full z-0' />
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}

const EvolutionContainer = ({ pokemon }: { pokemon: Pokemon }) => {
    const { evolutions } = pokemon;
    return (
        <div className='gap-2 grid grid-cols-3'>
            { evolutions?.map(evolution => {
                return (
                    <Link
                        className='text-center'
                        key={evolution.name}
                        to={`/${evolution.name.toLowerCase()}`}
                    >
                        <img
                            alt='pokemon-name'
                            className='block mx-auto w-20 h-20'
                            src={evolution.image}
                        />
                        <p className='font-bold text-gray-800'>{evolution.name}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Details;