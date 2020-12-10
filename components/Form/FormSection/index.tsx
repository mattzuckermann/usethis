import React from "react";
import ResultForm from "../ResultForm";
import ResultList from "../ResultList";
import AbsoluteBlock from "../../AbsoluteBlock";

const index = () => {
  return (
    <section className="container">
      <ResultForm />
      <ResultList />
      <AbsoluteBlock />
    </section>
  );
};

export default index;
