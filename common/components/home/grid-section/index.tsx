import { Grid } from "@/common/components/atoms/layouts/Grid";
import { Business } from "@/lib/actions/recommendations/types";

const GridSection: React.FC<{
  recommendations?: Business[];
  title?: string;
}> = ({ recommendations, title }) => {
  return (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} className="w-full">
      {title && <h1>{title}</h1>}
      {recommendations?.map((rec, index) => {
        return (
          <div className="w-full bg-red-500 h-52" key={index}>
            {rec.business_name}
          </div>
        );
      })}
    </Grid>
  );
};

export default GridSection;
