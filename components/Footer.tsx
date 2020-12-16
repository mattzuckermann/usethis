import React, { ReactElement } from 'react';

const Footer = (): ReactElement => {
  return (
    <footer>
      Copyright &copy;{new Date().getFullYear()} Matt Zuckermann. All Rights
      Reserved.
    </footer>
  );
};

export default Footer;
