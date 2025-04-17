import { Heart } from "lucide-react";
import SavedPanelHeader from "../saved-panel-header";

const SavedPanelNoResults: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200 flex flex-col">
      <SavedPanelHeader />
      <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 flex-grow min-h-[200px]">
        <Heart className="w-12 h-12 text-gray-400 mb-4" />
        <p className="font-semibold text-lg text-gray-700">
          No Saved Destinations Yet
        </p>
        <p className="mt-1 text-sm">
          Find places you love and save them here for quick access later!
        </p>
      </div>
    </div>
  );
};

export default SavedPanelNoResults;
