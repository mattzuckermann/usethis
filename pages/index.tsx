import React, { ReactElement } from 'react';
import SplashAnimation from '../components/SplashAnimation';
import FormSection from '../components/Form/FormSection';
import { withApollo } from '../lib/apollo';

const Home = (): ReactElement => (
  <section>
    <SplashAnimation />
    <FormSection />
  </section>
);

export default withApollo({ ssr: true })(Home);
