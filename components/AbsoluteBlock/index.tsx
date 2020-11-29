import React from "react";

const index = () => {
  return (
    <div className="absoluteBlock">
      <style jsx>{`
        .absoluteBlock {
          position: absolute;
          background-color: white;
          top: 11%;
          left: 0px;
          height: 80%;
          width: 100%;
          transform: skewY(5deg);
          box-shadow: 1px 1px black;
        }
      `}</style>
    </div>
  );
};

export default index;
