/* eslint-disable */

import { Radio } from "antd";
import "./style.css";

const SingleChoice = ({ currentQuestion, onChangeAnswer }) => {
  const handleChangeAnswer = (e) => {
    const selectedAnswerId = e.target.value;
    onChangeAnswer({
      questionId: currentQuestion._id,
      answers: [selectedAnswerId],
      type: currentQuestion.type,
    });
  };

  return (
    <div className="option-single-choice">
      <Radio.Group onChange={handleChangeAnswer}>
        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {currentQuestion.answerList.map((answer) => (
            <Radio.Button
              key={answer._id}
              value={answer._id}
              style={{
                padding: "1rem",
                width: "calc(50% - 1rem)",
                overflow: "hidden",
                fontWeight: "initial",
                color: "black",
              }}
            >
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {answer.value}
              </span>
            </Radio.Button>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
};

export default SingleChoice;
