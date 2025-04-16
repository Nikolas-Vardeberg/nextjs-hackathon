import { RecommendationItem } from "@/lib/actions/recommendations/types";
import PlaceCard from "../place-card";

const ScrollSection: React.FC<{
  recommendations?: RecommendationItem[];
  title?: string;
}> = ({ recommendations, title }) => {
  return (
    <>
      {title && <h1 className="text-2xl font-bold capitalize mb-4">{title}</h1>}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
        {recommendations?.map((rec, index) => (
          <div
            key={rec.business_name || index}
            className="snap-start min-w-[350px]"
          >
            <PlaceCard rec={rec} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrollSection;
