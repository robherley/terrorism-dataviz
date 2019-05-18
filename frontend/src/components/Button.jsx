import React, { useState, useEffect } from 'react';

const Button = ({ onChange }) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    onChange(toggled);
  }, [toggled]);

  return (
    <img
      src="/down.svg"
      alt="down button"
      className={`button${toggled ? '-down' : ''}`}
      onClick={() => setToggled(!toggled)}
    />
  );
};

export default Button;
