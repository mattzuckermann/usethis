import React from "react";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Card from "../../Card/Card";
import UserForm from "../UserForm";
import ResultForm from "../ResultForm";
import UserList from "../UserList";
import ResultList from "../ResultList";
import AbsoluteBlock from "../../AbsoluteBlock";

const index = () => {
  return (
    <div
      className="container"
      style={{ position: "relative", height: "100vh" }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <GridContainer spacing={10}>
          <GridItem md={6} xs={12}>
            <Card>
              <UserForm />
              <UserList />
            </Card>
          </GridItem>
          <GridItem md={6} xs={12}>
            <Card>
              <ResultForm />
              <ResultList />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <AbsoluteBlock />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default index;
