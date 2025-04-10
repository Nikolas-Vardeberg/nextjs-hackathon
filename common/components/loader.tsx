import { Loader2 } from "lucide-react";

type LoadingProps = {
  loading: boolean;
  children: React.ReactNode;
};

export default function Loading({ loading, children }: LoadingProps) {
  return loading ? (
    <Loader2 className="animate-spin h-5 w-5 text-black" />
  ) : (
    children
  );
}
