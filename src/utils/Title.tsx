import React, { FC } from 'react';

interface TitleProps {
  title: string;
  subtitle: string;
}

const Title: FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn playwright
      </a>
    </>
  );
};

export default Title;