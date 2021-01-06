import React, { ReactElement } from 'react';
import ResultForm from './ResultForm';
import ResultList from './ResultList';
import AbsoluteBlock from '../AbsoluteBlock';

const FormSection = (): ReactElement => {
  return (
    <section className="container layout">
      <div className="card">
        <h2>Results</h2>
        <ResultForm />
        <br />
        <ResultList />
      </div>
      <AbsoluteBlock />
    </section>
  );
};

export default FormSection;
