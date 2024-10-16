import React, { FC } from "react";

const Container: FC<HTMLDivElement> = ({ children }) => <div className="container mx-auto px-10">{children}</div>;

export default Container;
