import { ReactElement, useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import Link from 'next/link';
import { Input } from '../../components/Form/Input';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../../graphql/mutations/addUser';

const signup = (): ReactElement => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setToggle(true);
  });
  const props = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
    config: config.molasses,
  });
  const [addUser] = useMutation(ADD_USER);

  return (
    <animated.main className="centered card" style={props}>
      <h2>Sign Up</h2>
      <div>
        <form method="POST">
          <Input
            name="Email"
            value={email}
            placeholder="example@example.com"
            setState={setEmail}
          />
          <Input
            name="Password"
            value={password}
            placeholder="example"
            setState={setPassword}
          />
          <button
            className="full-width"
            disabled={!email || !password}
            onClick={(e) => {
              e.preventDefault();
              addUser({
                variables: {
                  user: {
                    name: email.split('@')[0],
                    email,
                    password,
                    image: '/profileIcon.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              });
              window.location.replace(`/auth/signin`);
            }}
          >
            Create Account
          </button>
        </form>
        <Link href="/auth/signin">
          <a>Already have an account? Sign in here!</a>
        </Link>
      </div>
    </animated.main>
  );
};

export default signup;
