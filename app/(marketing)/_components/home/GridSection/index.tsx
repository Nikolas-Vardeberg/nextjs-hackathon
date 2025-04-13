import { Grid } from "@/common/components/atoms/layouts/Grid";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import PlaceCard from "../PlaceCard";
const GridSection: React.FC<{
  recommendations?: RecommendationItem[];
  title?: string;
}> = ({ recommendations, title }) => {
  return (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} className="w-full">
      {title && <h1>{title}</h1>}
      {recommendations?.map((rec, index) => {
        return <PlaceCard rec={rec} key={index} />;
      })}
    </Grid>
  );
};

export default GridSection;
