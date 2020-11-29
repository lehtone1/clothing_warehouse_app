import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="Loading-container">
    <span className="Loading-text">Fetching Data. Please wait...</span>
    <div className="Loading" />
  </div>
);

export default Loading;
