import React from 'react';

const ETAButton = () => {
  const handleClick = () => {
    // implementation details
    alert("CLICKED")
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};

export default ETAButton;