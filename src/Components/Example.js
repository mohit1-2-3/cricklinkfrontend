import React, { useState, useRef } from 'react';
// import FirstComponent from './FirstComponent';
import Player from './Player/Players.js';

function ParentComponent() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const secondComponentRef = useRef(null);

  const handleStateUpdate = () => {
    // State update ke samay, pahla component ko hata kar dusra component open karein
    setShowFirstComponent(false);
    // Focus on the second component when it's shown
    if (secondComponentRef.current) {
      secondComponentRef.current.focus();
    }
  };

  return (
    <div>
      {/* {showFirstComponent ? (
        <FirstComponent handleStateUpdate={handleStateUpdate} />
      ) : (
        <SecondComponent ref={secondComponentRef} />
      )} */}
    </div>
  );
}

export default ParentComponent;
