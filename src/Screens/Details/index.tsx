// Modules
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
// Models
import Pokemon from '../../models/Pokemon';

interface IParams {
    pokemonName: string,
}
interface ILocation {
    pokemon?: Pokemon
}

const Details = (props: any) => {

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

    return (
        <div>detalhes do pokemmon: {pokemonName}</div>
    );
}

export default Details;