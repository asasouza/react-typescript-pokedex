// Modules
import React from 'react';
import { CSSTransition } from 'react-transition-group';
// Resources
import PokeballSvg from '../../Resources/pokeball.svg';

interface ISpinner {
    classAfterLoad?: string;
    isLoading?: boolean;
    transitionClassName?: string;
}

const Spinner = (props: ISpinner) => {
    const { classAfterLoad = '', isLoading = true, transitionClassName = '' } = props;

    return (
        <CSSTransition
            in={!isLoading}
            timeout={200}
            classNames={transitionClassName}
        >
            <img
                alt='Carregando...'
                className={`animate-spin-slow m-auto ${!isLoading && classAfterLoad}`}
                src={PokeballSvg}
            />
        </CSSTransition>
    )
}

export default Spinner;
