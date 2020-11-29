import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CardHeader from "../../Card/CardHeader";
import ListItem from "@material-ui/core/ListItem";

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
      <CardHeader color="primary">ADD RESULT</CardHeader>
      <ListItem>
        <form
          onSubmit={(e) => {
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
        >
          <div>
            <label htmlFor="score">Score:</label>
          </div>
          <input
            name="score"
            style={{ marginBottom: "10px", width: "150px" }}
            placeholder="Score"
            value={score}
            min={0}
            max={100}
            type="number"
            onChange={(e) => setScore(parseInt(e.target.value))}
          />
          <div>
            <input type="submit" value="Submit" disabled={!score} />
          </div>
        </form>
      </ListItem>
    </div>
  );
};

export default ResultForm;
