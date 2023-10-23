import React, { useState } from 'react';

const Alternativa = ({ texto, isCorreta, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const defaultClasses = 'rounded-md text-zinc-700 p-4 m-2 cursor-pointer transition-all mt-4';
    const hoverClasses = 'hover:bg-gray-300';
    const correctClasses = 'bg-green-500';
    const incorrectClasses = 'bg-red-500';

    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
            onClick(isCorreta);
        }
    };

    const getClassNames = () => {
        let classes = defaultClasses;
        if (isHovered && !isClicked) {
            classes += ` ${hoverClasses}`;
        }
        if (isClicked) {
            classes += ` ${isCorreta ? correctClasses : incorrectClasses}`;
        }
        return classes;
    };

    return (
        <div
            className={getClassNames()}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            ✦&nbsp;&nbsp;{texto}
        </div>
    );
};

export default Alternativa;
