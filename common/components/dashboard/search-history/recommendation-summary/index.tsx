import React from "react";

interface RecommendationSummaryProps {
  summary: string;
}

const RecommendationSummary: React.FC<RecommendationSummaryProps> = ({
  summary,
}) => {
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-500 mb-1">
        AI Recommendation Summary
      </h5>
      <p className="text-sm">{summary}</p>
    </div>
  );
};

export default RecommendationSummary;
