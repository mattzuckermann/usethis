import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { User } from 'next-auth';
import { GetServerSidePropsContext } from 'next';

const studyLinks = [
  {
    name: 'w3schools',
    link: 'https://www.w3schools.com/js/js_this.asp',
    image:
      'https://imstartpage.com/wp-content/uploads/2015/01/W3Schools-logo.png',
  },
  {
    name: 'javascripttutorial',
    link: 'https://www.javascripttutorial.net/javascript-this/',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
  },
];

const Study = ({ user }: { user: User }): ReactElement => {
  return (
    <main className="layout">
      <h1>Study Materials:</h1>
      <hr />
      <section>
        {studyLinks.map((studyLink, index) => {
          return (
            <div key={index} className="flex-centered card">
              <h2>{studyLink.name}</h2>
              <a
                target="_blank"
                className="no-decoration"
                rel="noopener noreferrer"
                href={studyLink.link}
              >
                <img
                  width="300"
                  alt={`${studyLink.name}-logo`}
                  src={studyLink.image}
                />
              </a>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Study;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<Record<string, never> | { props: { user: User } }> {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
