import React, { useState, useEffect } from "react";
import "./solving.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Bilets } from "../../data/Data";
import gentra from "../../assets/gentra.png";

const SolvingProblems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bilet = Bilets.find((b) => b.id === id);

  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [answeredStatus, setAnsweredStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [usedTime, setUsedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (showSummary) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showSummary]);

  const handleAnswer = (questionId, answerId, correctId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selected: answerId,
        isCorrect: answerId === correctId,
      },
    }));
  };

  const updateAnsweredStatus = (index) => {
    const q = bilet.questions[current];
    const ans = userAnswers[q.id];
    if (ans) {
      setAnsweredStatus((prev) => ({
        ...prev,
        [q.id]: ans.isCorrect,
      }));
    }
    setCurrent(index);
  };

  const handleNext = () => {
    updateAnsweredStatus(current + 1);
  };

  const handlePrev = () => {
    updateAnsweredStatus(current - 1);
  };

  const handleCheck = () => {
    updateAnsweredStatus(current);
    setUsedTime(600 - timeLeft);
    setShowSummary(true);
  };

  const seconds = timeLeft % 60;
  const minutes = Math.floor(timeLeft / 60);

  if (!bilet) return <div>Bunday bilet topilmadi.</div>;

  const question = bilet.questions[current];
  const allAnswered = bilet.questions.every((q) => userAnswers[q.id]);
  const correctCount = Object.values(userAnswers).filter(
    (a) => a.isCorrect
  ).length;

  const getCorrectAnswerText = (q) => {
    const correct = q.answers.find((a) => a.id === q.correctAnswerId);
    return correct ? correct.text : "";
  };

  return (
    <div className="solving-container">
      <div className="header">
        <span className="timer">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="question-number-top">
        <h2 className="question-text">
          {current + 1} - savol: {question.question}
        </h2>
      </div>

      <div className="solving">
        <div className="left">
          <ul className="answers-list">
            {question.answers.map((a) => (
              <li key={a.id}>
                <label>
                  <input
                    type="radio"
                    name={question.id}
                    value={a.id}
                    checked={userAnswers[question.id]?.selected === a.id}
                    onChange={() =>
                      handleAnswer(question.id, a.id, question.correctAnswerId)
                    }
                    disabled={showSummary}
                  />
                  <span className="answer-text">{a.text}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="nav-buttons">
            {current > 0 && <button onClick={handlePrev}>Oldingisi</button>}
            {current < bilet.questions.length - 1 ? (
              <button onClick={handleNext}>Keyingisi</button>
            ) : (
              <button disabled={!allAnswered} onClick={handleCheck}>
                Tekshirish
              </button>
            )}
          </div>
        </div>

        <div className="right">
          <div className="image-area">
            <img src={gentra} alt="mashina" />
          </div>
        </div>
      </div>

      <div className="navigation">
        {bilet.questions.map((q, idx) => {
          const status = answeredStatus[q.id];
          let className = "nav-btn";
          if (idx === current) className += " current";
          else if (status === true) className += " correct";
          else if (status === false) className += " wrong";
          return (
            <button
              key={q.id}
              className={className}
              disabled={idx === current}
              onClick={() => updateAnsweredStatus(idx)}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {showSummary && (
        <div className="overlay">
          <div className="summary">
            <h3>Umumiy natijalar</h3>
            <p>
              To'g'ri javoblar soni: {correctCount} / {bilet.questions.length}
            </p>
            <ul>
              {bilet.questions.map((q, idx) => {
                const userAnswer = userAnswers[q.id];
                return (
                  <li key={q.id}>
                    {idx + 1}-savol:{" "}
                    {userAnswer?.isCorrect
                      ? "✅ to'g'ri"
                      : `❌ noto'g'ri — To'g'ri javob: ${getCorrectAnswerText(
                          q
                        )}`}
                  </li>
                );
              })}
            </ul>
            <p>
              Ishlatilgan vaqt: {Math.floor(usedTime / 60)} daqiqa{" "}
              {usedTime % 60} soniya
            </p>
            <div className="summary-actions">
              <button onClick={() => window.location.reload()}>
                Qayta ishlash
              </button>
              <button onClick={() => navigate("mainPage/choosingBilet")}>
                Boshqa bilet tanlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolvingProblems;
