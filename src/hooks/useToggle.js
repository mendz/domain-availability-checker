import { useState } from 'react';

const useToggle = () => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    setOn(!on);
  };

  return [on, toggle];
};

export default useToggle;
