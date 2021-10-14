import React from "react";
import { useSelector } from "react-redux";

const computePercentage = (votes, totalVotes) => {
  if (votes === 0) {
    return 0;
  }
  return Math.round((votes / totalVotes) * 100);
};
export const QuestionDetails = (props) => {
  const questionId = props.match.params.id;
  const questions = useSelector((state) => state.counter.questions);
  const authorDetails = useSelector((state) => state.counter.users);

  const selectedQuestion = questions[questionId];
  const pollAuthor = selectedQuestion.author;
  const authorDetail = authorDetails[pollAuthor];
  const optionOneVotes = selectedQuestion.optionOne.votes.length;
  const optionTwoVotes = selectedQuestion.optionTwo.votes.length;
  const selectedOptionOnePollText = selectedQuestion.optionOne.text;
  const selectedOptionTwoPollText = selectedQuestion.optionTwo.text;
  const optionOneVoters = JSON.stringify(selectedQuestion.optionOne.votes);
  const optionTwoVoters = JSON.stringify(selectedQuestion.optionTwo.votes);

  return (
    <div>
      <h3>Welcome to the Poll {questionId}</h3>
      <div key={selectedQuestion.id} className="card options-card">
        <p>Would you Rather</p>
        <img src={authorDetail["avatarURL"]} alt="author images"></img>
        <div className="options-holder">
          <div className="option-text">
            <p>
              {selectedOptionOnePollText} || {selectedOptionTwoPollText}
            </p>
            <p>
              {optionOneVotes} votes || {optionTwoVotes} votes
            </p>
            <p>
              {computePercentage(optionOneVotes, 3)}% ||{" "}
              {computePercentage(optionTwoVotes, 3)} %
            </p>
            <p>
              {optionOneVoters} || {optionTwoVoters}
            </p>
          </div>
          <p>Written by {pollAuthor}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
