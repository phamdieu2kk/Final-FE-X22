/*eslint-disable*/
import { useState } from "react";
import { Checkbox, Row, Col } from "antd";
import "./style.css";

const MultipleChoice = ({ currentQuestion, onChangeAnswer }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleChangeAnswer = (values) => {
        setSelectedAnswers(values);
        onChangeAnswer({
            questionId: currentQuestion._id,
            answers: values,
            type: currentQuestion.type,
        });
    };

    const handleCheckboxChange = (answerId) => {
        setSelectedAnswers((prevState) => {
            if (prevState.includes(answerId)) {
                return prevState.filter((id) => id !== answerId);
            } else {
                return [...prevState, answerId];
            }
        });
    };

    const colCount = 2; // Số cột bạn muốn chia

    return (
        <div className="option-multiple-choice">
            <Checkbox.Group
                style={{
                    width: "calc(50% - 1rem)",
                    overflow: "hidden",
                }}
                value={selectedAnswers}
                onChange={handleChangeAnswer}
            >
                <Row gutter={[16, 16]}>
                    {currentQuestion.answerList.map((answer, index) => (
                        <Col key={answer._id} span={24 / colCount}>
                            <div
                                className={`answer-option ${
                                    selectedAnswers.includes(answer._id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleCheckboxChange(answer._id)}
                            >
                                <Checkbox
                                    value={answer._id}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%", 
                                    }}
                                >
                                    {answer.value}
                                </Checkbox>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    );
};

export default MultipleChoice;