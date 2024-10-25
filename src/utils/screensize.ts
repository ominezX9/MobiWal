import { useState, useEffect } from 'react';

// Function to determine device type
const getDeviceType = () => {
  const width = window.innerWidth;

  if (width <= 767) {
    return 'phone';
  } else if (width >= 768 && width <= 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Custom hook to track device type in real-time
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
