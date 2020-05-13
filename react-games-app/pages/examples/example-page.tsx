import { FaceCard } from "components/face-card";
import { fetchCardsFromShuffledDeck } from "client/deck-of-cards"; 
const ExamplePage: React.FC = () => {
    
    const result = fetchCardsFromShuffledDeck(52);
    console.log(result);

    return (

        <FaceCard cardId="1" isFaceDown cardFaceUrl="public/clubs_2.png" />
    );
};

export default ExamplePage;