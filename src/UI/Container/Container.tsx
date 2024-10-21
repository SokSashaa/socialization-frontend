import React, {FC, HTMLAttributes} from "react";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => <div className="container mx-auto px-10">{children}</div>;

export default Container;
