import React, { useState } from "react";
import { Heart } from "lucide-react";

interface HeartButtonProps {
  onClick: (isSelected: boolean) => boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    const shouldSelect = onClick(!isSelected);
    return setIsSelected(shouldSelect);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-md shadow-md transition-transform duration-200 ${
          isSelected ? "scale-110" : "scale-100"
        }`}
      >
        <Heart
          className={`h-6 w-6 transition-colors ${
            isSelected ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

export default HeartButton;
