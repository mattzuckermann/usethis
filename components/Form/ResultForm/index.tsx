import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_RESULT = gql`
  mutation addResult($result: ResultInput) {
    addResult(result: $result) {
      _id
      score
    }
  }
`;

const ResultForm = () => {
  const [score, setScore] = useState(0);
  const [addResult] = useMutation(ADD_RESULT, {
    refetchQueries: ["getAllResults"],
  });
  return (
    <div>
      <div>
        <form>
          <div>
            <label htmlFor="score">Score:</label>
          </div>
          <input
            name="score"
            placeholder="Score"
            value={score}
            min={0}
            max={100}
            type="number"
            onChange={(e) => setScore(parseInt(e.target.value))}
          />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addResult({
                  variables: {
                    result: {
                      score,
                    },
                  },
                });
                setScore(0);
              }}
              disabled={!score}
            >
              Submit
            </button>
            {/* <input type="submit" value="Submit" disabled={!score} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
