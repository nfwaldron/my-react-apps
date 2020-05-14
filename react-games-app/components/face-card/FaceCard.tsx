import React from "react";
import styled from "@emotion/styled";
import { Image } from "../image";
import { radii, mediaQueries } from "theme";

const FaceCardContainer = styled.div({
  height: 165,
  width: 115,
  [mediaQueries.sm]: {
    height: 175,
    width: 125,
  },
  overflow: "hidden",
  //borderRadius: radii.rounded,
  position: "relative",
  boxShadow: "0 0 3px rgba(black, .15)",
  //border: "2px solid #bababa",
  "&:hover": {
    cursor: "pointer",
    border: "2px solid #5e5e5e",
    boxShadow: "0 0 10px rgba(#5e5e5e, .6)",
  },
});

export type FaceCardProps = {
  cardId: string;
  isFaceDown: boolean;
  cardFaceUrl: string;
  isDisabled?: boolean;
  isSolved?: boolean;
  onClick?: (card: string) => void;
};

export const FaceCard: React.FC<FaceCardProps> = ({
  cardId,
  isDisabled,
  isFaceDown,
  cardFaceUrl,
  isSolved,
  onClick,
}) => {
  return (
    /// TODO: CSS animations for card flips
    <FaceCardContainer onClick={() => isDisabled || isSolved ? null : onClick(cardId)}>
      {
        isFaceDown ? <Image
          css={{
            width: "100%",
            top: 0,
            bottom: 0,
            objectPosition: "50% 50%",
            height: "100%",
          }}
          src={cardFaceUrl}
        />
          : <div css={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear - gradient(45deg, #1fa5ff 25 %, #1053ff 25 %, #1053ff 50 %, #1fa5ff 50 %, #1fa5ff 75 %, #1053ff 75 %, #1053ff 100 %)",
            backgroundSize: "56px 56px",
          }}/>
      }
    </FaceCardContainer >
  );
};