import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface SearchCountryProps {
  onSearch: (search: string, id: number) => void;
  id: number;
  loading?: boolean;
}

export default function SearchCountry({
  onSearch,
  id,
  loading,
}: SearchCountryProps) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search, id);
  };

  return (
    <form
      className="flex w-full max-w-md items-center space-x-2"
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
        Search
      </Button>
    </form>
  );
}
