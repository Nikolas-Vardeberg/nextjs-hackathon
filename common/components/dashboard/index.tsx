import ActivityPanel from "./activity-panel";
import SavedPanel from "./saved-panel";
import SearchHistory from "./search-history";

const Dashboard: React.FC = () => {
  return (
    <div>
      Dashboard goes here
      <ActivityPanel />
      <SavedPanel />
      <SearchHistory />
    </div>
  );
};

export default Dashboard;
