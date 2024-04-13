/*eslint-disable*/
import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice";
import MultipleChoice from "../MultipleChoice";
import { Button, Flex, Result, Modal } from "antd";
import "./style.css";
import ArrangeQuestions from "../ArrangeQuestions";
import api from "../../api";
import { useSearchParams } from "react-router-dom";

const QUESTION_TYPE = {
    SINGLE_CHOICE: "single-choice",
    MULTI_CHOICE: "multi-choice",
    ARRANGE_CHOICE: "arrange",
};

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerList, setAnswerList] = useState([]);
    const [timeLeft, setTimeLeft] = useState(120); // Thời gian còn lại ban đầu: 2 phút * 60 giây/phút
    const [timeUp, setTimeUp] = useState(false);
    const [showResult, setShowResult] = useState(false); // Biến để kiểm soát hiển thị kết quả
    const [score, setScore] = useState(0); // State để lưu điểm số
    const [confirmSubmit, setConfirmSubmit] = useState(false); // State để kiểm soát xác nhận nộp bài
    const [isTimerRunning, setIsTimerRunning] = useState(true); // State để kiểm soát việc chạy thời gian
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            try {
                const challengeId = searchParams.get("challengeId");
                const res = await api.getQuestion.invoke({
                    queries: {
                        challengeId: challengeId,
                    },
                });
                setQuestions(res.data.questionList); // Assuming res.data contains the questions
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isTimerRunning) {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft === 0) {
                        clearInterval(timer);
                        setTimeUp(true);
                        return prevTimeLeft;
                    } else {
                        return prevTimeLeft - 1;
                    }
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isTimerRunning]);

    useEffect(() => {
        if (timeUp && currentIndex !== questions.length - 1) {
            handleSubmitButtonClick(); // Tự động chuyển sang trang kết quả
        }
    }, [timeUp, currentIndex, questions]);

    const changeAnswer = (data) => {
        const newAnswerList = answerList.filter(
            (answer) => answer.questionId !== data.questionId
        );

        switch (data.type) {
            case QUESTION_TYPE.SINGLE_CHOICE:
                newAnswerList.push(data);
                break;
            case QUESTION_TYPE.MULTI_CHOICE:
                if (data.answers.length > 0) {
                    newAnswerList.push(data);
                }
                break;

            case QUESTION_TYPE.ARRANGE_CHOICE:
                newAnswerList.push(data);
                break;

            default:
                break;
        }

        setAnswerList(newAnswerList);
    };

    useEffect(() => {
        console.log("answerList: ", answerList);
    }, [answerList]);

    const handleNextButtonClick = () => {
        const answerCurrent = answerList.find((answer) => {
            return answer.questionId === questions[currentIndex]._id;
        });

        if (answerCurrent) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSubmitButtonClick = () => {
        setConfirmSubmit(true); // Hiển thị xác nhận trước khi nộp bài
    };

    const handleConfirmSubmit = async () => {
        console.log("nộp bài");

        console.log(answerList);

        const response = await api.checkChallengeAnswers.invoke({
            data: {
                challengeId: searchParams.get("challengeId"),
                answerList,
            },
        });

        setShowResult(true); // Hiển thị kết quả khi bấm nút "Nộp bài"
        setConfirmSubmit(false); // Đặt lại state của xác nhận
        setIsTimerRunning(false); // Dừng thời gian
        setScore(response.data.point);
        setCorrectAnswer(response.data.correctAnswer);
    };

    return (
        <div className="container">
            <div className="questions-container">
                {questions.length > 0 && currentIndex < questions.length && (
                    <div className="question-card">
                        <Flex justify="space-between" align="center">
                            <h6>
                                Số câu hỏi: {currentIndex + 1}/
                                {questions.length} - Loại:{" "}
                                {questions[currentIndex].type}
                            </h6>
                            <h6>Score: </h6>
                            <h6>
                                Thời gian: {Math.floor(timeLeft / 60)}:
                                {timeLeft % 60 < 10
                                    ? `0${timeLeft % 60}`
                                    : timeLeft % 60}
                            </h6>
                        </Flex>
                        <div className="question-header">
                            <h3 className="question">
                                {questions[currentIndex].question}
                            </h3>
                            {/* Add question container here if needed */}
                        </div>
                        <div className="question-content">
                            {questions[currentIndex].type ===
                                QUESTION_TYPE.SINGLE_CHOICE && (
                                <SingleChoice
                                    currentQuestion={questions[currentIndex]}
                                    onChangeAnswer={changeAnswer}
                                />
                            )}
                            {questions[currentIndex].type ===
                                QUESTION_TYPE.MULTI_CHOICE && (
                                <MultipleChoice
                                    currentQuestion={questions[currentIndex]}
                                    onChangeAnswer={changeAnswer}
                                />
                            )}
                            {questions[currentIndex].type ===
                                QUESTION_TYPE.ARRANGE_CHOICE && (
                                <ArrangeQuestions
                                    currentQuestion={questions[currentIndex]}
                                    onChangeAnswer={changeAnswer}
                                />
                            )}
                        </div>
                        <div className="button-container">
                            {currentIndex !== questions.length - 1 ? (
                                <Button
                                    type="primary"
                                    onClick={handleNextButtonClick}
                                    disabled={
                                        !answerList.some(
                                            (answer) =>
                                                answer.questionId ===
                                                questions[currentIndex]._id
                                        )
                                    }
                                >
                                    Câu tiếp theo
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={handleSubmitButtonClick}
                                >
                                    Nộp bài
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                <div className="result-container">
                    {showResult && (
                        <Result
                            status="success"
                            title="Hoàn thành thử thách!"
                            subTitle={`
                        Tổng số câu hỏi: ${questions.length}\n,
                        Tổng số điểm: ${score}\n,
                        Bạn đã làm đúng: ${correctAnswer}/${answerList.length} câu `}
                        />
                    )}
                </div>
                <Modal
                    title="Xác nhận nộp bài"
                    open={confirmSubmit}
                    onOk={handleConfirmSubmit}
                    onCancel={() => setConfirmSubmit(false)}
                >
                    <p>Bạn có chắc chắn muốn nộp bài không?</p>
                </Modal>
            </div>
        </div>
    );
};

export default Questions;