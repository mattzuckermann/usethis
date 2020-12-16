import React, { useState, useEffect, FC } from 'react';
import { useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('./Loading'));
const LoggedOut = dynamic(() => import('./LoggedOut'));
const LoggedIn = dynamic(() => import('./LoggedIn'));

const Header: FC = () => {
  const [session, loading] = useSession();
  const [path, setPath] = useState('');
  useEffect(() => {
    setPath(window.location.pathname);
  });

  if (typeof window !== 'undefined' && loading) return <Loading />;
  if (!session || path === '/welcome') return <LoggedOut path={path} />;
  return <LoggedIn user={session.user} />;
};

export default Header;
