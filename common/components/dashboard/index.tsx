import ActivityPanel from "./activity-panel";
import SavedPanel from "./saved-panel";
import SearchHistory from "./search-history";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SearchHistory />
        </div>
        <div>
          <ActivityPanel />
          <SavedPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
