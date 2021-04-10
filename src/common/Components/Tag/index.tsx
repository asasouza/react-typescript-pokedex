import React from 'react';

interface ITag {
    backgroundColor: string;
    text: string;
}

const Tag = (props: ITag) => {
    const { backgroundColor, text } = props;
    return (
        <span
            className={`${backgroundColor} bg-opacity-40 mb-2 mr-2 px-2 py-1 rounded-3xl shadow text-sm text-white`}
        >
            {text}
        </span>
    )
}

export default Tag;