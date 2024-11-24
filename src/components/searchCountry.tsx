import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";

interface SearchCountryProps {
  onSearch: (search: string, id: number) => void;
  id: number;
  loading?: boolean;
  variant?: "main" | "side";
}

export default function SearchCountry({
  onSearch,
  id,
  loading,
  variant,
}: SearchCountryProps) {
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(variant === "side");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search, id);
  };

  return (
    <>
      {" "}
      {hidden ? (
        <Button
          variant="outline"
          className="rounded-xl p-3"
          onClick={() => setHidden(false)}
        >
          <Plus size={24} /> Add country
        </Button>
      ) : (
        <form
          className="flex w-1/2 max-w-md items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            disabled={loading}
            className="rounded-xl"
            placeholder="Search for a country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button disabled={loading} className="rounded-xl" type="submit">
            {loading && <LoaderCircle className="animate-spin" size={24} />}
            {variant === "side" ? "Add" : "Search"}
          </Button>
        </form>
      )}
    </>
  );
}
