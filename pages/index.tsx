import React, { ReactElement } from 'react';

import SplashAnimation from '../components/SplashAnimation';

const Home = (): ReactElement => (
  <section>
    <SplashAnimation />
  </section>
);

export default Home;

export async function getServerSideProps(): Promise<{
  props: { authenticated: boolean };
}> {
  return {
    props: {
      authenticated: false,
    },
  };
}
