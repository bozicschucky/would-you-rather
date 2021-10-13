import React from "react";
import { useSelector } from "react-redux";

export const QuestionDetails = (props) => {
  const questionId = props.match.params.id;
  const questions = useSelector((state) => state.counter.questions);
  const authorDetails = useSelector((state) => state.counter.users);

  const selectedQuestion = questions[questionId];
  const pollAuthor = selectedQuestion.author;
  const authorDetail = authorDetails[pollAuthor];

  return (
    <div>
      <h3>Welcome to the Poll {questionId}</h3>
      <div key={selectedQuestion.id} className="card options-card">
        <p>Would you Rather</p>
        <img src={authorDetail["avatarURL"]} alt="author images"></img>
        <div className="options-holder">
          <div className="option-text">
            <p>
              {selectedQuestion.optionOne.text} ||{" "}
              {selectedQuestion.optionTwo.text}
            </p>
            <p>
              {selectedQuestion.optionOne.votes.length} votes ||{" "}
              {selectedQuestion.optionTwo.votes.length} votes
            </p>
            <p>
              {JSON.stringify(selectedQuestion.optionOne.votes)} ||{" "}
              {JSON.stringify(selectedQuestion.optionTwo.votes)}
            </p>
          </div>
          <p>Written by {selectedQuestion.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
