// Modules
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
// Components
import Tag from '../../common/Components/Tag';
// Models
import Pokemon from '../../models/Pokemon';
// Resources
import PokeballSvg from '../../common/Resources/pokeball.svg';
import Arrow from '../../common/Resources/arrow.svg';

interface IParams {
    pokemonName: string,
}
interface ILocation {
    pokemon?: Pokemon
}

const Details = () => {

    const [tab, setTab] = useState('evolution');

    const { pokemonName } = useParams<IParams>();
    const location = useLocation<ILocation>();
    const pokemon = location.state ? location.state.pokemon : null;

    // const result = useQuery(['pokemon', pokemonName],
    //     () => {
    //         return <pokemon, queryKey: 'te'>
    //     }, {
    //     initialData: () => pokemon
    // }
    // )

    console.log(pokemonName, pokemon);

    if (!pokemon) {
        return <div></div>
    }

    const renderCurrentTab = (tab: string) => {
        switch (tab) {
            case 'about':
                return <AboutContainer />;
            case 'stats':
                return <StatsContainer />;
            case 'evolution':
                return <EvolutionContainer />;
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
        <div className={`${pokemon.backgroundClassByType} flex flex-col h-screen max-w-md mx-auto overflow-x-hidden relative`}>
            <div className='p-4 relative text-white'>
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
                    <p className='font-semibold text-2xl'>#001</p>
                </div>

                <img alt={pokemon.name} className='block mx-auto relative w-2/3 -m-14 z-10' src={pokemon.image} />
                <img alt='' className='absolute -bottom-11 -right-12 opacity-20 w-72 z-0' src={PokeballSvg} />
            </div>

            <div className='bg-white flex-1 px-4 rounded-t-3xl shadow-inner'>
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

const AboutContainer = () => {
    return (
        <table className='text-gray-400 font-semibold'>
            <tbody>
                <tr>
                    <td className='pb-3 pr-10'>Height</td>
                    <td className='font-bold pb-3 text-gray-800'>20</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Weight</td>
                    <td className='font-bold pb-3 text-gray-800'>20</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Abilities</td>
                    <td className='font-bold pb-3 text-gray-800'>Overgrow, Clorophyll</td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Base Experience</td>
                    <td className='font-bold pb-3 text-gray-800'>65</td>
                </tr>
            </tbody>
        </table>
    )
}

const StatsContainer = () => {
    return (

        <table className='text-gray-400 font-semibold'>
            <tbody>
                <tr>
                    <td className='pb-3 pr-10'>HP</td>
                    <td className='font-bold pb-3 text-gray-800 pr-3'>20</td>
                    <td className='relative w-full pb-2'>
                        <div style={{ width: `${20}%` }} className='absolute border border-green-700 max-w-full z-10' />
                        <div className='absolute border border-gray-100 w-full z-0' />
                    </td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Attack</td>
                    <td className='font-bold pb-2 text-gray-800'>46</td>
                    <td className='relative w-full pb-2'>
                        <div style={{ width: `${46}%` }} className='absolute border border-red-700 max-w-full z-10' />
                        <div className='absolute border border-gray-100 w-full z-0' />
                    </td>
                </tr>
                <tr>
                    <td className='pb-3 pr-10'>Defense</td>
                    <td className='font-bold pb-2 text-gray-800'>65</td>
                    <td className='relative w-full pb-2'>
                        <div style={{ width: `${65}%` }} className='absolute border border-green-700 max-w-full z-10' />
                        <div className='absolute border border-gray-100 w-full z-0' />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const EvolutionContainer = () => {
    return (
        <div className='gap-2 grid grid-cols-3'>
            <Link className='text-center' to='/charmander'>
                <img
                    alt='pokemon-name'
                    className='block mx-auto w-20 h-20'
                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
                />
                <p className='font-bold text-gray-800'>Bulbassaur</p>
            </Link>
            <div className='text-center'>
                <img
                    alt='pokemon-name'
                    className='block mx-auto w-20 h-20'
                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
                />
                <p className='font-bold text-gray-800'>Bulbassaur</p>
            </div>
            <div className='text-center'>
                <img
                    alt='pokemon-name'
                    className='block mx-auto w-20 h-20'
                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
                />
                <p className='font-bold text-gray-800'>Bulbassaur</p>
            </div>
        </div>
    )
}

export default Details;