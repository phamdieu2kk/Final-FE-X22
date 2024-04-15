/*eslint-disable*/
import { useEffect, useState } from "react";
import SingleChoice from "../SingleChoice";
import MultipleChoice from "../MultipleChoice";
import { Button, Flex, Result, Modal, Progress } from "antd";
import "./style.css";
import ArrangeQuestions from "../ArrangeQuestions";
import api from "../../api";
import { useSearchParams, Link } from "react-router-dom";
import { Typography } from "antd";

const QUESTION_TYPE = {
  SINGLE_CHOICE: "single-choice",
  MULTI_CHOICE: "multi-choice",
  ARRANGE_CHOICE: "arrange",
};

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(180); // Thời gian còn lại ban đầu: 2 phút * 60 giây/phút
  const [timeUp, setTimeUp] = useState(false);
  const [showResult, setShowResult] = useState(false); // Biến để kiểm soát hiển thị kết quả
  const [score, setScore] = useState(0); // State để lưu điểm số
  const [confirmSubmit, setConfirmSubmit] = useState(false); // State để kiểm soát xác nhận nộp bài
  const [isTimerRunning, setIsTimerRunning] = useState(true); // State để kiểm soát việc chạy thời gian
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPlayAgain, setShowPlayAgain] = useState(false); // State để kiểm soát hiển thị nút "Chơi lại"
  const [submitted, setSubmitted] = useState(false);
  const [challengeName, setChallengeName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const challengeId = searchParams.get("challengeId");
        const res = await api.getQuestion.invoke({
          queries: {
            challengeId: challengeId,
          },
        });
        setChallengeName(res.data.questionList[0].challengeId.challengeName);
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
        const formattedAnswers = data.answers.map((answer) => answer._id);
        data.answers = formattedAnswers;
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

    setConfirmSubmit(false); // Đặt lại state của xác nhận
    setIsTimerRunning(false); // Dừng thời gian
    setScore(response.data.point);
    setCorrectAnswer(response.data.correctAnswer);
    setShowPlayAgain(true); // Hiển thị nút "Chơi lại"
    setShowResult(true); // Hiển thị kết quả khi bấm nút "Nộp bài"
    setSubmitted(true); // Đã nộp bài
  };

  const progressPercent =
    currentIndex === questions.length - 1 && questions.length % 2 !== 0
      ? Math.floor(((currentIndex + 1) / questions.length) * 100)
      : Math.floor(((currentIndex + 1) / questions.length) * 100);

  const TYPE_QUESTION = {
    "single-choice": "lựa chọn đơn",
    "multi-choice": "Nhiều lựa chọn",
    arrange: "Sắp xếp",
  };

  return (
    <div className="container">
      <div className="questions-container">
        {questions.length > 0 && currentIndex < questions.length && (
          <div className="question-card">
            <Typography.Title
              level={2}
              style={{
                textAlign: "center",
                color: "#f5d612",
              }}
            >
              {`Thử thách: ${challengeName}`}
            </Typography.Title>
            <Flex justify="space-between" align="center">
              <Progress
                className="custom-progress"
                percent={progressPercent}
                status="active"
                strokeColor="#13aa7b"
                strokeWidth={12}
              />
              {/* <h4 className="custom-progress">
                Loại: {TYPE_QUESTION[questions[currentIndex].type]}{" "}
              </h4> */}
              <Progress
                className="time-progress"
                type="circle"
                strokeWidth={6}
                strokeColor="#13aa7b"
                percent={(timeLeft / 180) * 100}
                status="active"
                size={50}
                format={() =>
                  `${Math.floor(timeLeft / 60)}:${
                    (timeLeft % 60 < 10 ? "0" : "") + (timeLeft % 60)
                  }`
                }
              />
            </Flex>
            <div className="question-header">
              <h2 className="question">
                Câu hỏi: {questions[currentIndex].question}
              </h2>
            </div>
            <div className="question-content">
              {questions[currentIndex].type === QUESTION_TYPE.SINGLE_CHOICE && (
                <SingleChoice
                  currentQuestion={questions[currentIndex]}
                  onChangeAnswer={changeAnswer}
                />
              )}
              {questions[currentIndex].type === QUESTION_TYPE.MULTI_CHOICE && (
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
                  style={{ backgroundColor: "#f5d612" }}
                  type="primary"
                  onClick={handleNextButtonClick}
                  disabled={
                    !answerList.some(
                      (answer) =>
                        answer.questionId === questions[currentIndex]._id
                    )
                  }
                >
                  Câu tiếp theo
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "#f5d612" }}
                  type="primary"
                  onClick={handleSubmitButtonClick}
                  disabled={submitted}
                >
                  Nộp bài
                </Button>
              )}
              {showPlayAgain && (
                <Link to="/topic" className="restart-button">
                  <Button
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Chơi lại
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
        {/* Hiển thị thông báo kết quả */}
        <Modal
          title="Kết quả thử thách"
          visible={showResult}
          onCancel={() => setShowResult(false)}
          footer={[
            <Button key="ok" onClick={() => setShowResult(false)}>
              OK
            </Button>,
          ]}
        >
          <Result
            status="success"
            title="Hoàn thành thử thách!"
            subTitle={
              <>
                <span style={{ fontSize: "16px" }}>
                  Tổng số câu hỏi: {questions.length}
                  <br />
                  Bạn đã làm đúng: {correctAnswer}/{answerList.length} câu
                  <br />
                  Tổng số điểm: {Math.floor(score)} điểm
                </span>
              </>
            }
          />
        </Modal>
        <Modal
          title="Xác nhận nộp bài"
          visible={confirmSubmit}
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
