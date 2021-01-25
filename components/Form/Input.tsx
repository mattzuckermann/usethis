import { ReactElement } from 'react';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
type Props = {
  name: string;
  value: string;
  placeholder: string;
  setState: Dispatch<SetStateAction<string>>;
};

export const Input = ({
  name,
  value,
  placeholder,
  setState,
}: Props): ReactElement => {
  return (
    <label
      className="inputField"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p>{name}:</p>
      <input
        id={name.toLowerCase()}
        type={name.toLowerCase()}
        name={name.toLowerCase()}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </label>
  );
};
