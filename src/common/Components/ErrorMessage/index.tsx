import React from 'react';

const ErrorMessage = () => {
    return (
        <div>
            <h1 className='font-semibold mb-2 text-xl'>Ops, something went wrong...</h1>
            <p>Please try reloading the page</p>
            <p>or if it's urgent contact <b>Professor Oak</b></p>
        </div>
    )
}

export default ErrorMessage;