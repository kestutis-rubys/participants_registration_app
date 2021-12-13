import React from 'react';
// import css
import './Button.css';

const Button = ({ text, dataSet, action }) => {
  return (
    <button data-set={dataSet} onClick={action}>
      {text}
    </button>
  );
};

export default Button;
