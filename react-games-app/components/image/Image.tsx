import React from "react";

export type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({src, ...imageProps}) => {
    return (
        <img {...imageProps} src={src}/>
    );
};