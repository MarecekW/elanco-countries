"use client";

import CountryCard from "@/components/countryCard";
import SearchCountry from "@/components/searchCountry";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CountryPopulationAPI {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: Array<{
      year: number;
      value: number;
    }>;
  };
}

export default function PageClient() {
  const [countries, setCountries] = useState<
    Array<{ name: string; iso3: string; population: number }>
  >([
    { name: "", iso3: "", population: 0 },
    { name: "", iso3: "", population: 0 },
  ]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState<{
    search: string;
    id: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (search: string, id: number) => {
    setSearchTerm({ search, id });
  };

  const removeCountry = (id: number) => {
    setCountries((prev) =>
      prev.map((country, index) =>
        index === id
          ? {
              name: "",
              iso3: "",
              population: 0,
            }
          : country
      )
    );
  };

  useEffect(() => {
    if (!searchTerm) return;
    setError(null);
    setLoading(true);

    fetch("https://countriesnow.space/api/v0.1/countries/population", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: searchTerm?.search.toLowerCase() }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Check the country name and try again");
        }
        return res.json();
      })
      .then((data: CountryPopulationAPI) => {
        const currentPopulation = data.data.populationCounts.reduce(
          (latest, current) => (current.year > latest.year ? current : latest)
        ).value;
        setCountries((prev) =>
          prev.map((country, index) =>
            index === searchTerm?.id
              ? {
                  name: data.data.country,
                  iso3: data.data.iso3,
                  population: currentPopulation,
                }
              : country
          )
        );
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <>
      {countries[0].name !== "" || countries[1].name !== "" ? (
        <div className="flex w-full h-full justify-between items-center mt-16">
          {/* Left Side */}
          <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300 px-4">
            {countries[0].name === "" ? (
              <>
                <SearchCountry
                  variant="side"
                  loading={loading}
                  id={0}
                  onSearch={handleSearch}
                />
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </>
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center">
                <CountryCard
                  country={countries[0]}
                  otherCountry={countries[1]}
                />
                <Button variant="outline" onClick={() => removeCountry(0)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
          {/* Right Side */}
          <div className="w-1/2 flex flex-col items-center justify-center px-4">
            {countries[1].name === "" ? (
              <>
                <SearchCountry
                  variant="side"
                  loading={loading}
                  id={1}
                  onSearch={handleSearch}
                />
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </>
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center">
                <CountryCard
                  country={countries[1]}
                  otherCountry={countries[0]}
                />
                <Button variant="outline" onClick={() => removeCountry(1)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-1/2 justify-center items-center">
          <SearchCountry
            variant="main"
            loading={loading}
            id={0}
            onSearch={handleSearch}
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}
    </>
  );
}
