import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import cloneDeep from "clone-deep";
import { fetchCardsFromShuffledDeck } from "client/deck-of-cards";
import { MemoryGameBoard } from "./MemoryGameBoard";
import { FaceCardProps } from "components/face-card";
import { Card } from "client/deck-of-cards/models";

// TODO: Look into making more generic method to initialize cards for the future
// This method is pretty specific to this particular game

type FaceCard = Pick<FaceCardProps, "cardFaceUrl" | "cardId" | "isFaceUp">;

// TODO: This should be refactored. There is way too much happening on the client. Look into setting up
// a GQL server and requesting this data via the GQL API

const generateCards = async (nbCards: number): Promise<FaceCard[]> => {
    if (nbCards % 2 !== 0) {
        return null;
    }
    const cards = await fetchCardsFromShuffledDeck(nbCards);
    const faceCards = cards
        .slice(0, nbCards / 2)
        .map((card: Card) => ({
            cardId: uuid(),
            cardFaceUrl: card.image,
            isFaceUp: true,
        }))
        .flatMap((e: FaceCard) => [e, { ...cloneDeep(e), cardId: uuid() }]);

    // TODO: This is an inefficient way to randomize the cards. Look into implementing Fisher Yates algorithm on the backend
    // the client is doing way too much heavy lifting at the moment
    return faceCards.sort(() => 0.5 - Math.random());
};

export type MemoryGameProps = {
    nbCards: number;
};

export const MemoryGame: React.FC<MemoryGameProps> = ({ nbCards }) => {

    const [cards, setCards] = useState<FaceCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [solvedCards, setSolvedCards] = useState<string[]>([]);
    let [gameRounds, setGameRounds] = useState(0);
    const [disabled, setDisabled] = useState(false);

    // TODO add restart game functionality
    useEffect(() => {
        const initializeDeck = async () => {
            const result = await generateCards(nbCards);
            setCards(result);
        };
        initializeDeck();
    }, []);

    const onClick = (id: string) => {
        setDisabled(true);
        if (flippedCards.length === 0) {
            setFlippedCards([id]);
            setDisabled(false);
        } else {
            setGameRounds(gameRounds + 1);
            console.log(gameRounds);
            handleCardMatching(id);
        }
    };

    const handleCardMatching = (id: string) => {
        if (flippedCards.includes(id)) {
            setDisabled(false);
            return;
        }
        setFlippedCards([...flippedCards, id]);
        if (isMatch(id)) {
            setSolvedCards([...solvedCards, flippedCards[0], id]);
            resetCards();
        } else {
            setTimeout(resetCards, 2000);
        }
    };

    const isMatch = (id: string) => {
        const clickedCard = cards.find((card) => card.cardId === id);
        const flippedCard = cards.find((card) => flippedCards[0] === card.cardId);
        return flippedCard.cardFaceUrl === clickedCard.cardFaceUrl;
    };

    const resetCards = () => {
        setFlippedCards([]);
        setDisabled(false);
    };

    return (
        // TODO add time countdown component and game round component above game board
        <div>
            <MemoryGameBoard
                faceCards={cards}
                flippedCards={flippedCards}
                onClick={onClick}
                solvedCards={solvedCards}
                disabled={disabled}
            />
        </div>
    );
};
