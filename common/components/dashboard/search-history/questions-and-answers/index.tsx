import React from "react";

interface QuestionsAndAnswersProps {
  questions: { label: string; value: string }[];
}

const QuestionsAndAnswers: React.FC<QuestionsAndAnswersProps> = ({
  questions,
}) => {
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-500 mb-1">
        Your Questions & Answers
      </h5>
      <ul className="space-y-2 text-sm">
        {questions.map((question, index) => (
          <li key={index} className="flex gap-2">
            <span className="font-medium">{question.label}:</span>
            <span>{question.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsAndAnswers;
