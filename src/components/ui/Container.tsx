import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`px-4 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
