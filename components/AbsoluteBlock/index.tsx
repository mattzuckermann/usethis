import React from "react";

const index = () => {
  return (
    <div className="absoluteBlock">
      <style jsx>{`
        .absoluteBlock {
          z-index: -1;
          position: absolute;
          top: 11%;
          left: 0px;
          height: 80%;
          width: 100%;
          transform: skewY(5deg);
          background-color: var(--black);
          box-shadow: var(--level-3);
        }
      `}</style>
    </div>
  );
};

export default index;
