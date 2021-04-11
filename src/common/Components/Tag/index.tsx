import React from 'react';

interface ITag {
    backgroundColor: string;
    text: string;
    size?: string;
}

const Tag = (props: ITag) => {
    const { backgroundColor, size = 'md', text } = props;

    const classNames = size === 'md' ?
        `${backgroundColor} bg-opacity-40 mb-2 mr-2 px-2 py-1 rounded-3xl shadow text-sm text-white` :
        `${backgroundColor} bg-opacity-40 mb-2 mr-2 px-4 py-1 rounded-3xl shadow text-base text-white`;

    return (
        <span
            className={classNames}
        >
            {text}
        </span>
    )
}

export default Tag;