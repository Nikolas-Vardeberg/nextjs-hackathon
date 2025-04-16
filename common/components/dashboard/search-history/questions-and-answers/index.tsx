import React from "react";

interface QuestionsAndAnswersProps {
  answers?: string[];
}

const QuestionsAndAnswers: React.FC<QuestionsAndAnswersProps> = ({
  answers,
}) => {
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-500 mb-1">
        Your Questions & Answers
      </h5>
      {answers && (
        <ul className="space-y-2 text-sm">
          <li className="">
            <span className="font-medium">Destination: </span>
            <span>{answers[3]}</span>
          </li>
          <li className="">
            <span className="font-medium">Accommodation: </span>
            <span>{answers[1]}</span>
          </li>
          <li className="">
            <span className="font-medium">Budget: </span>
            <span>{answers[2]}</span>
          </li>
          <li className="">
            <span className="font-medium">Duration: </span>
            <span>{answers[5]}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
