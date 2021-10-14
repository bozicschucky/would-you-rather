import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "../store/reducers";

const Home = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.counter.loggedInUser.name);
  const questions = useSelector((state) => state.counter.questions);
  const questionsArray = Object.values(questions);
  const questionCategories = {
    answered: [],
    unanswered: [],
  };

  const groupQuestions = (questions) => {
    questions.forEach((question) => {
      if (
        question.optionOne.votes.includes(loggedInUser) ||
        question.optionTwo.votes.includes(loggedInUser)
      ) {
        questionCategories.answered.push(question);
      } else {
        questionCategories.unanswered.push(question);
      }
    });
  };
  // groups questions into answered and unanswered
  groupQuestions(questionsArray);

  const [dataCategory, setDataToggle] = useState("unanswered");
  const [questionCategory, setCategory] = useState(
    questionCategories[dataCategory]
  );
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const handleDataToggle = (e) => {
    const answer = e.target.dataset.answer;
    setDataToggle(answer);
    setCategory(questionCategories[answer]);
  };

  const data = questionCategory.length
    ? questionCategory
    : questionCategories["unanswered"];
  const sortedData = data.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return (
    <div>
      <p>
        Welcome back user <span className="user-name">{loggedInUser}</span>
      </p>

      <h3>User Questions</h3>
      <p>
        <button
          type="button"
          data-answer="unanswered"
          onClick={handleDataToggle}
        >
          {" "}
          UnAnswered
        </button>{" "}
        ||{" "}
        <button data-answer="answered" onClick={handleDataToggle}>
          Answered
        </button>
      </p>
      <p>{dataCategory} Questions</p>
      <div>
        {sortedData.map((qtn) => {
          return (
            <React.Fragment key={qtn.id}>
              <Link to={`question-details/${qtn.id}`}>
                <div key={qtn.id} className="card options-card">
                  <p>Would you Rather</p>
                  <div className="options-holder">
                    <div className="option-text">
                      <p>
                        {qtn.optionOne.text} || {qtn.optionTwo.text}
                      </p>
                      <p>
                        {qtn.optionOne.votes.length} votes ||{" "}
                        {qtn.optionTwo.votes.length} votes
                      </p>
                      <p>
                        {JSON.stringify(qtn.optionOne.votes)} ||{" "}
                        {JSON.stringify(qtn.optionTwo.votes)}
                      </p>
                    </div>
                    <p>Written by {qtn.author}</p>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
