import React from "react";
import QuestionsAndAnswers from "../questions-and-answers";
import RecommendationSummary from "../recommendation-summary";

interface SearchDetailsProps {
  summary: string;
  answers?: string[];
}

const SearchDetails: React.FC<SearchDetailsProps> = ({ answers, summary }) => {
  return (
    <div className="px-6 pb-4">
      <div className="border-t pt-3 border-gray-300">
        <h4 className="font-medium mb-2">Search Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuestionsAndAnswers answers={answers} />
          <RecommendationSummary summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;
