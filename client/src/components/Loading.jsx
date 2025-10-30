import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Loading = () => {
  const { navigate } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/myorders');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      <p className="text-gray-700 font-medium">Loading your orders...</p>
    </div>
  );
};

export default Loading;

