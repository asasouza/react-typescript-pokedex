// Modules
import React from 'react';
// Resources
import PokeballSvg from '../../Resources/pokeball.svg';

interface ISpinner {
    classAfterLoad?: string;
    isLoading?: boolean;
}

const Spinner = (props: ISpinner) => {
    const { classAfterLoad = '', isLoading = true } = props;

    return (
        <img
            alt='Loading...'
            className={`animate-spin-slow m-auto ${!isLoading && classAfterLoad}`}
            src={PokeballSvg}
        />
    )
}

export default Spinner;
