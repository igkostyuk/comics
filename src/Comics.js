import React from 'react';

const Comics = ({ title, image }) => (
  <div>
    <div className="title">{title}</div>
    <div className="image">{image}</div>
  </div>
);

export default Comics;
