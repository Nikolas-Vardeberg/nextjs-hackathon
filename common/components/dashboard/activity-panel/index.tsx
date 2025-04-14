import React from "react";

import { Search, MapPin, Heart, Calendar } from "lucide-react";

const ActivityPanel: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Your Activity
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Search className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Searches</div>
              <div className="text-2xl font-bold">12</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Destinations Explored</div>
              <div className="text-2xl font-bold">37</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Heart className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Saved Favorites</div>
              <div className="text-2xl font-bold">5</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium">Planned Trips</div>
              <div className="text-2xl font-bold">2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPanel;
