import React from "react";
import { mediaQueries } from "theme";
import { FaceCard, FaceCardProps } from "components/face-card";
import styled from "@emotion/styled";

const GameBoard = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  [mediaQueries.sm]: {
    gridTemplateColumns: "repeat(4, auto)",
  },
  [mediaQueries.md]: {
    gridTemplateColumns: "repeat(5, auto)",
  },
  [mediaQueries.lg]: {
    gridTemplateColumns: "repeat(6, auto)",
  },
  gridGap: 10,
  justifyContent: "center",
});

export type GameBoardProps = {
  faceCards: FaceCardProps[];
  flippedCards: string[];
  disabled: boolean;
  solvedCards: string[];
  onClick: (id: string) => void;
};
export const MemoryGameBoard: React.FC<GameBoardProps> = ({
  faceCards,
  flippedCards,
  disabled,
  solvedCards,
  onClick,
}) => {
  return (
    <GameBoard>
      {faceCards.map((card) => (
        <FaceCard
          key={card.cardId}
          onClick={() => onClick(card.cardId)}
          cardFaceUrl={card.cardFaceUrl}
          cardId={card.cardId}
          isFaceDown={flippedCards.includes(card.cardId)}
          isDisabled={disabled || solvedCards.includes(card.cardId)}
          isSolved={solvedCards.includes(card.cardId)}
        />
      ))}
    </GameBoard>
  );
};
