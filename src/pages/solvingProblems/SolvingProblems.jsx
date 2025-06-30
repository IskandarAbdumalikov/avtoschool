import React, { useState, useEffect } from "react";
import "./solving.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Bilets } from "../../data/Data";
import gentra from "../../assets/gentra.png";
import logo from "../../assets/logo.png";
import { LuX } from "react-icons/lu";

const SolvingProblems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bilet = Bilets.find((b) => b.id === id);

  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [answeredStatus, setAnsweredStatus] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [usedTime, setUsedTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (showSummary) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setUsedTime(600);
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showSummary]);

  const handleAnswer = (questionId, answerId, correctId) => {
    if (answeredStatus[questionId]) return; // prevent change if finalized
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
    if (ans && !answeredStatus[q.id]) {
      setAnsweredStatus((prev) => ({
        ...prev,
        [q.id]: ans.isCorrect,
      }));
    }
    setCurrent(index);
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
        <h1>AVTOSHKOLATEST</h1>
        <button>
          <LuX onClick={() => navigate("/mainPage/profile")} />
        </button>
      </div>

      <div className="question-number-top">
        <div className="question-box">
          {current + 1} - savol: {question.question}
        </div>
        <span className="timer">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="solving">
        <div className="left">
          <ul className="answers-list">
            {question.answers.map((a, index) => (
              <li
                key={a.id}
                onClick={() =>
                  handleAnswer(question.id, a.id, question.correctAnswerId)
                }
                className={
                  userAnswers[question.id]?.selected === a.id ? "selected" : ""
                }
              >
                <div className="answer-text">
                  <div className="answer-text__left">F{index + 1}</div>
                  <div className="answer-text__right">{a.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <div className="image-area">
            <img src={gentra} alt="mashina" />
          </div>
        </div>
      </div>

      <div className="navigation">
        {bilet.questions.map((q, idx) => {
          const isCurrent = idx === current;
          const isAnswered = answeredStatus[q.id];
          const isCorrect = userAnswers[q.id]?.isCorrect;
          return (
            <button
              key={q.id}
              className={`nav-btn-rect ${
                isCurrent
                  ? "current"
                  : isAnswered
                  ? isCorrect
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onClick={() => updateAnsweredStatus(idx)}
              disabled={isAnswered || isCurrent}
            >
              {idx + 1}
            </button>
          );
        })}
        {current === bilet.questions.length - 1 && allAnswered && (
          <button className="check-button" onClick={handleCheck}>
            Tekshirish
          </button>
        )}
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
