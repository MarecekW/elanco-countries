import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";

interface Country {
  name: string;
  iso3: string;
  population: number;
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
}

export default function CountryCard({
  country,
  otherCountry,
}: {
  country: Country;
  otherCountry: Country;
}) {
  const [countryData, setCountryData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: country.name }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching the flag");
        }
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="flex gap-4 text-gray-300">
        <LoaderCircle className="animate-spin" size={24} />
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!countryData) return <p>No profile data</p>;

  const BASE_SIZE = 300;
  let flagSize = BASE_SIZE;

  if (otherCountry && countryData) {
    const scaleFactor =
      country.population /
      Math.max(country.population, otherCountry.population);
    flagSize = Math.round(BASE_SIZE * Math.sqrt(scaleFactor));
  }

  return (
    <div className="flex flex-col max-w-md items-center gap-8 bg-white justify-center">
      <h2 className="text-3xl font-semibold">{countryData.data.name}</h2>
      <Image
        src={countryData.data.flag}
        alt={`Flag of ${countryData.data.name}`}
        width={flagSize}
        height={flagSize}
        className="rounded shadow-lg"
      />
      <div className="flex flex-col items-center">
        <p className="font-bold">Population</p>
        <p>{country.population.toLocaleString()}</p>
      </div>
    </div>
  );
}
