import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "../store/reducers";

const Home = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.counter.loggedInUser.name);
  const questions = useSelector((state) => state.counter.questions);
  const questionsArray = Object.values(questions);

  const [dataCategory, setDataToggle] = useState("unanswered");

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const handleDataToggle = (e) => {
    const answer = e.target.dataset.answer;
    setDataToggle(answer);
  };

  const data =
    dataCategory === "unanswered"
      ? questionsArray.filter(
          (question) =>
            !question.optionOne.votes.includes(loggedInUser) &&
            !question.optionTwo.votes.includes(loggedInUser)
        )
      : questionsArray.filter(
          (question) =>
            question.optionOne.votes.includes(loggedInUser) ||
            question.optionTwo.votes.includes(loggedInUser)
        );
  const sortedData = data.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return (
    <div>
      <p>
        Welcome back <span className="user-name">{loggedInUser}</span>
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
                  <div className="options-holder">
                    <div className="option-text">
                      <p>
                        {qtn.optionOne.text} || {qtn.optionTwo.text}
                      </p>
                    </div>
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
