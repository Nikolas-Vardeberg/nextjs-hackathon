import { Grid } from "@/common/components/atoms/layouts/Grid";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import PlaceCard from "../place-card";
const GridSection: React.FC<{
  recommendations?: RecommendationItem[];
  title?: string;
}> = ({ recommendations, title }) => {
  return (
    <>
      {title && <h1 className="text-2xl font-bold capitalize mb-4">{title}</h1>}
      <Grid
        columns={{ sm: 1, md: 2, lg: 3 }}
        x={{ md: 16, lg: 16 }}
        y={{ md: 16, lg: 16 }}
        className="w-full"
      >
        {recommendations?.map((rec, index) => {
          return <PlaceCard rec={rec} key={index} />;
        })}
      </Grid>
    </>
  );
};

export default GridSection;
