import React from 'react';
import loaderGif from '../assets/images/spinner.gif';

//Loader utility
const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <img src={loaderGif} alt="Loading..." className="h-16 w-16" />
    </div>
  );
};

export default Loader;