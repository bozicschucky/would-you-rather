import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestionAnswer, getQuestions } from "../store/reducers";

const computePercentage = (votes, totalVotes) => {
  if (votes === 0) {
    return 0;
  }
  return Math.round((votes / totalVotes) * 100);
};
export const QuestionDetails = (props) => {
  const dispatch = useDispatch();
  const questionId = props.match.params.id;
  const questions = useSelector((state) => state.counter.questions);
  const authorDetails = useSelector((state) => state.counter.users);
  const loggedInUser = useSelector((state) => state.counter.loggedInUser.name);
  const [questionAnswer, setQuestionAnswer] = useState({});
  const selectedQuestion = questions[questionId];
  const pollAuthor = selectedQuestion.author;
  const authorDetail = authorDetails[pollAuthor];
  const optionOneVotes = selectedQuestion.optionOne.votes.length;
  const optionTwoVotes = selectedQuestion.optionTwo.votes.length;
  const selectedOptionOnePollText = selectedQuestion.optionOne.text;
  const selectedOptionTwoPollText = selectedQuestion.optionTwo.text;

  let selectedQuestionCopy = {};

  useEffect(() => {
    if (questionAnswer.hasOwnProperty("qid")) {
      dispatch(saveQuestionAnswer(questionAnswer));
      dispatch(getQuestions(questionAnswer));
    }
  }, [dispatch, questionAnswer]);
  const handleSelectedOption = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "optionOne") {
      selectedQuestionCopy = {
        answer: selectedOption,
        authedUser: loggedInUser,
        qid: questionId,
      };
      setQuestionAnswer(selectedQuestionCopy);
    } else {
      selectedQuestionCopy = {
        answer: selectedOption,
        authedUser: loggedInUser,
        qid: questionId,
      };
      setQuestionAnswer(selectedQuestionCopy);
    }
  };
  const optionOneVoters = JSON.stringify(selectedQuestion.optionOne.votes);
  const optionTwoVoters = JSON.stringify(selectedQuestion.optionTwo.votes);

  return (
    <div>
      <h3>Welcome to the Poll {questionId}</h3>
      <div key={selectedQuestion.id} className="card options-card">
        <p>Would you Rather</p>
        <img
          src={authorDetail["avatarURL"]}
          alt="author images"
          className="author-image"
        ></img>
        <div className="options-holder">
          <div className="option-text">
            <p>
              {selectedOptionOnePollText} || {selectedOptionTwoPollText}
            </p>
            <p>
              {optionOneVotes}/3 votes || {optionTwoVotes}/3 votes
            </p>
            <p>
              {computePercentage(optionOneVotes, 3)}% ||{" "}
              {computePercentage(optionTwoVotes, 3)} %
            </p>
            <div>
              <label htmlFor="options">Vote:</label>
              <select
                id="options"
                defaultValue="choose between the options"
                onChange={handleSelectedOption}
              >
                <option value="">vote</option>
                <option value="optionOne">Option one</option>
                <option value="optionTwo">Option two</option>
              </select>
            </div>
            <p>
              Option voters: {optionOneVoters} || {optionTwoVoters}
            </p>
          </div>
          <p>Written by {pollAuthor}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
