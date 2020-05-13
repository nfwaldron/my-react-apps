import React from 'react';
import { useEffect, useState } from 'react';

export type FlipCardProps = {
    cardZIndex?: string;
    containerStyle?: {};
    isCardFlipped?: boolean;
    flipSpeedBackToFront?: number;
    flipSpeedFrontToBack?: number;
    cardStyles?: { front?: {}; back?: {} };
    infinite?: boolean;
    flipDirection?: 'horizontal' | 'vertical';
    children: [React.ReactNode, React.ReactNode];
};

export const FlipCard: React.FC<FlipCardProps> = ({
    cardStyles: {
        back,
        front,
    },
    flipDirection,
    flipSpeedFrontToBack,
    flipSpeedBackToFront,
    infinite,
    isCardFlipped,
    children,
}) => {
    const [isFlipped, setIsFlipped] = useState(isCardFlipped);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (isFlipped !== isFlipped) {
            setIsFlipped(isFlipped);
            setRotation((c) => c + 180);
        }
    }, [isFlipped]);

    const getComponent = (key: 0 | 1) => {
        if (children.length !== 2) {
            throw new Error(
                'Component ReactCardFlip requires 2 children to function',
            );
        }
        return children[key];
    };

    const frontRotateY = `rotateY(${
        infinite ? rotation : isFlipped ? 180 : 0
        }deg)`;
    const backRotateY = `rotateY(${
        infinite ? rotation + 180 : isFlipped ? 0 : -180
        }deg)`;
    const frontRotateX = `rotateX(${
        infinite ? rotation : isFlipped ? 180 : 0
        }deg)`;
    const backRotateX = `rotateX(${
        infinite ? rotation + 180 : isFlipped ? 0 : -180
        }deg)`;
    return (
        <div css={{
            height: '100%',
            position: 'relative',
            width: '100%',
        }}>
            <div css={{
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                height: '100%',
                left: '0',
                position: isFlipped ? 'absolute' : 'relative',
                top: '0',
                transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
                transformStyle: 'preserve-3d',
                transition: `${flipSpeedBackToFront}s`,
                width: '100%',
                zIndex: 2,
                ...front,
            }}>
                {getComponent(0)}
            </div>
            <div css={{
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                height: '100%',
                left: '0',
                position: isFlipped ? 'relative' : 'absolute',
                top: '0',
                transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
                transformStyle: 'preserve-3d',
                transition: `${flipSpeedFrontToBack}s`,
                width: '100%',
                ...back,
            }}>
                {getComponent(1)}
            </div>
        </div>
    );
};

FlipCard.defaultProps = {
    cardStyles: {
        back: {},
        front: {},
    },
    cardZIndex: 'auto',
    containerStyle: {},
    flipDirection: 'horizontal',
    flipSpeedBackToFront: 0.6,
    flipSpeedFrontToBack: 0.6,
    infinite: false,
    isCardFlipped: false,
};