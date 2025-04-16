import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { SearchItem } from "../../search-history/context";
import Badge from "@/common/components/ui/Badge";

interface HeaderProps {
  recommendation: SearchItem;
}

export default function Header({ recommendation }: HeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{recommendation?.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="md">
            <Calendar className="mr-1 h-4 w-4" /> {recommendation?.date}
          </Badge>
        </div>
      </div>

      <p className="text-gray-600 mb-6 max-w-3xl">{recommendation?.summary}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {recommendation?.tags.map((tag, index) => (
          <Badge key={index} variant="white">
            <Tag className="mr-1 h-3 w-3" /> {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
