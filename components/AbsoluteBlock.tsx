import React, { ReactElement } from 'react';

const AbsoluteBlock = (): ReactElement => {
  return (
    <div className="absoluteBlock">
      <style jsx>{`
        .absoluteBlock {
          z-index: -1;
          position: absolute;
          top: 11%;
          left: calc(var(--containerPadding) * -1);
          height: 80%;
          width: 100vw;
          transform: skewY(5deg);
          background-color: var(--blue);
          box-shadow: var(--level-3);
        }
      `}</style>
    </div>
  );
};

export default AbsoluteBlock;
