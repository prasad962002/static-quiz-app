import { useState } from "react";
import { quiz1 } from "./quiz1";
import "./quiz.css";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setResult((prevResult) =>
      selectedAnswer
        ? {
            ...prevResult,
            score: prevResult.score + 5,
            correctAnswers: prevResult.correctAnswers + 1,
          }
        : {
            ...prevResult,
            wrongAnswers: prevResult.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onSelectedAnswer = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === questions[activeQuestion].correctAnswer) {
      setSelectedAnswer(true);
      console.log("correct");
    } else {
      setSelectedAnswer(false);
      console.log("wrong");
    }
  };

  const { questions } = quiz1;
  const { question, choices } = questions[activeQuestion];
  const addLeadingZero = (number) => (number <= 9 ? number : `0${number}`);

  return (
      <div className="quiz-container">
      {!showResult ? (
      <div>
        <h1>Quiz</h1>
        <h2>{question}</h2>
        <div>
          <span className="active-question-no">
            {" "}
            {addLeadingZero(activeQuestion + 1)}{" "}
          </span>
          <span className="total-question">
            {" / "}
            {addLeadingZero(questions.length)}{" "}
          </span>
        </div>
        <ul>
          {choices.map((answer, i) => (
            <li
              className={i === selectedAnswerIndex ? "selected-answer" : null}
              key={i}
              onClick={() => {
                onSelectedAnswer(answer, i);
              }}
            >
              {answer}
            </li>
          ))}
        </ul>
        <div className="flex-right">
          <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
            {activeQuestion === questions.length - 1 ? "Finish" : "Next"}{" "}
          </button>
        </div>
      </div>
      ) : (

      <div className="result">
        <h3>Result</h3>
        <p>
          Total question : <span> {questions.length}</span>{" "}
        </p>
        <p>
          Total score : <span>{result.score}</span>
        </p>
        <p>
          Correct Answers : <span>{result.correctAnswers}</span>
        </p>
        <p>
          Wrong Answers : <span>{result.wrongAnswers}</span>
        </p>
      </div>
      )}
    </div>
  );
};

export default Quiz;
