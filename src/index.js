import React from 'react';
import ReactDOM from 'react-dom';
import {
  Navigation,
  WeatherBanner,
  HeroHeader,
  Warnings,
  Articles,
} from './App';

ReactDOM.render(
  <React.StrictMode>
    <Navigation/>
    <WeatherBanner/>
    <HeroHeader/>
    <Warnings/>
    <Articles/>
  </React.StrictMode>,
  document.getElementById('root')
);