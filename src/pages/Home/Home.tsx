import React from 'react';
import './Home.scss';
import { homeImage } from '../../assets';

function Home() {
  return (
    <div className="home">
      <h1>Добро пожаловать!</h1>
      <img
        alt="главное изображение"
        src={homeImage}
      />
    </div>
  );
}

export default Home;
