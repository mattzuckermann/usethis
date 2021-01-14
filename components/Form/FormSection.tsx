import React, { ReactElement } from 'react';
import { ResultList } from './ResultList';
import { User } from '../../src/@types/users';
import AbsoluteBlock from '../AbsoluteBlock';

const FormSection = ({ user }: { user: User }): ReactElement => {
  return (
    <section className="container">
      <div className="card">
        <h2>Results</h2>
        <ResultList user={user} />
      </div>
      <AbsoluteBlock />
    </section>
  );
};

export default FormSection;
