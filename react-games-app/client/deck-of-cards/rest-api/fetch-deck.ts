import { deckOfCardsClient } from "client/deck-of-cards";

export const fetchCardsFromShuffledDeck = async (nbCards: number) => {
    if (nbCards > 52) {
        throw new Error(`Argument nbCards must be less than 52, the value passed in was ${nbCards}`);
    }
    const { data } = await deckOfCardsClient().get("deck/new/draw/", {
        params: {
            count: nbCards,
        }
    });
    return data;
};
