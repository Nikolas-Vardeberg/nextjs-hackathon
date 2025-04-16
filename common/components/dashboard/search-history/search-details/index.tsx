import React from "react";
import QuestionsAndAnswers from "../questions-and-answers";
import RecommendationSummary from "../recommendation-summary";
import Badge from "@/common/components/ui/Badge";

interface SearchDetailsProps {
  summary: string;
  answers?: string[];
  tags?: string[];
}

const SearchDetails: React.FC<SearchDetailsProps> = ({
  answers,
  summary,
  tags,
}) => {
  return (
    <div className="px-6 pb-4">
      <div className="border-t pt-6 border-gray-300">
        <h4 className="font-bold mb-2">Search Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuestionsAndAnswers answers={answers} />
          <RecommendationSummary summary={summary} />
        </div>
        <div className="flex flex-wrap gap-2 mb-3 mt-6 border-t pt-6 border-gray-300">
          {tags?.map((tag, index) => (
            <Badge variant="secondary" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;
