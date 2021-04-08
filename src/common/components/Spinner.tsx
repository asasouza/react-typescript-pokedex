// Modules
import React from 'react';
// Resources
import PokeballSvg from '../Resources/pokeball.svg';

interface ISpinner {
    classAfterLoad?: string;
    isLoading?: boolean;
}

const Spinner = (props: ISpinner) => {
    const { classAfterLoad = '', isLoading = true } = props;

    return (
        <img 
            alt='Carregando...' 
            className={`${isLoading ? 'animate-spin-slow' : 'animate-none' } duration-500 m-auto transition-all ${!isLoading && classAfterLoad}`} 
            src={PokeballSvg} 
        />
    )
}

export default Spinner;