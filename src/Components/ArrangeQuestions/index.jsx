/* eslint-disable */
import { Button } from "antd";
import { useEffect, useState } from "react";
import "./style.css";

const fake = {
    "_id": "660b1d6cdde56f5c9820422a",
    "type": "arrange",
    "question": "Sap xep cac tu duoi day thanh cau hoan chinh",
    "answerList": [
      {
        "value": "A",
        "index": 0,
        "_id": "660b25b9dde56f5c98205d4f"
      },
      {
        "value": "B",
        "index": 1,
        "_id": "660b25b9dde56f5c98205d50"
      },
      {
        "value": "C",
        "index": 2,
        "_id": "660b25b9dde56f5c98205d51"
      },
      {
        "value": "D",
        "index": 3,
        "_id": "660b25b9dde56f5c98205d52"
      },
      {
        "value": "E",
        "index": 4,
        "_id": "660b25b9dde56f5c98205d53"
      },
      {
        "value": "F",
        "index": 5,
        "_id": "660b25b9dde56f5c98205d54"
      },
      {
        "value": "G",
        "index": 6,
        "_id": "660b25b9dde56f5c98205d55"
      }
    ],
    "challengeId": {
      "$oid": "660b1a35bead8eea4f5d0ec2"
    },
    "__v": 0
  }

  function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


const ArrangeQuestions = ({ currentQuestion, onChangeAnswer }) => {

    const [answerList1, setAnswerList1] = useState([]);
    const [answerList2, setAnswerList2] = useState([]);

    useEffect(() => {
        // thiet lap gia tri ban dau cho answerList1 va answerList2
        const newAnswerList = [...currentQuestion.answerList];
        shuffle(newAnswerList);
        setAnswerList1(newAnswerList);
        setAnswerList2([]);
    }, [currentQuestion]);

  const handleChangeAnswer = (e) => {
      onChangeAnswer({
          questionId: currentQuestion._id,
          answers: e.target.value,
          type: currentQuestion.type,
      });
  }; 

  const swapElement = (answerId, source) => {
    // neu click answer item tai list 1 => day answer item sang list 2
    let userAnswer = [];
    if (source == 'answer-list-1') {
        const answer = answerList1.find(e => e._id == answerId);

        const newAnswerList2 = [...answerList2, answer];
        setAnswerList2(newAnswerList2);
        userAnswer = newAnswerList2;

        const newAnswerList1 = answerList1.filter(e => e._id != answerId);
        setAnswerList1(newAnswerList1);
    }
    // neu click answer item tai list 2 => day answer item sang list 1
    else if (source == 'answer-list-2') {
        const answer = answerList2.find(e => e._id == answerId);

        const newAnswerList1 = [...answerList1, answer];
        setAnswerList1(newAnswerList1);

        const newAnswerList2 = answerList2.filter(e => e._id != answerId);
        setAnswerList2(newAnswerList2);
        userAnswer = newAnswerList2;
    }

    onChangeAnswer({
        questionId: currentQuestion._id,
        answers: userAnswer,
        type: currentQuestion.type,
    });
  }

  return (
     <div className="option-arrange">
            
            <div className="answer-list answer-list-1">
                {answerList1.map(answer => <div key={answer._id} className="answer-item" onClick={() => swapElement(answer._id, 'answer-list-1')}>{answer.value}</div>)}
            </div>

            <div className="answer-list answer-list-2">
                {answerList2.map(answer => <div key={answer._id} className="answer-item" onClick={() => swapElement(answer._id, 'answer-list-2')}>{answer.value}</div>)}
            </div>
        </div>
    );
};


export default ArrangeQuestions