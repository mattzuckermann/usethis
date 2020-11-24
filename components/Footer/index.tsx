import React from "react";

const index = () => {
  return (
    <footer style={{ marginTop: "50px" }}>
      &copy;{new Date().getFullYear()} Matt Zuckermann. All Rights Reserved.
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </footer>
  );
};

export default index;
