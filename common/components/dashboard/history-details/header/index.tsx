import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SearchItem } from "../../search-history/context";

interface HeaderProps {
  recommendation: SearchItem;
}

export default function Header({ recommendation }: HeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{recommendation?.title}</h1>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-teal-50 text-teal-700 border-teal-200">
            <Calendar className="mr-1 h-4 w-4" /> {recommendation?.date}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6 max-w-3xl">{recommendation?.summary}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {recommendation?.tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white text-gray-800 border-gray-200"
          >
            <Tag className="mr-1 h-3 w-3" /> {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
