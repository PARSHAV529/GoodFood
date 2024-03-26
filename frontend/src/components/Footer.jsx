import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 fixed bottom-0 w-full flex justify-between items-center px-4">
      <div>
        <p>
          <a href="#">License</a> | <a href="#">Contribute</a> | <a href="#">Contact Us</a>
        </p>
      </div>
      <div>
        <p>© 2024 Copyright: GoodFood</p>
      </div>
    </footer>
  );
};

export default Footer;
