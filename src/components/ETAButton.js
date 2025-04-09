import React from 'react';

const ETAButton = () => {
  const handleClick = () => {
    // implementation details
    alert("CLICKED")
    socket.emit('myEvt', "TEST REACT");
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