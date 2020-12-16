import React, { ReactElement } from 'react';
import ResultForm from './ResultForm';
import ResultList from './ResultList';
import AbsoluteBlock from '../AbsoluteBlock';

const FormSection = (): ReactElement => {
  return (
    <section className="container">
      <div className="card">
        <ResultForm />
        <ResultList />
      </div>
      <AbsoluteBlock />
    </section>
  );
};

export default FormSection;
