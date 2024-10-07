import Header from "@/components/Header";
import { ADD_COUNTRY, GET_CONTINENTS, GET_COUNTRIES } from "@/graphql/client";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";

interface Country {
  name: string;
  code: string;
  emoji: string;
  continent: string;
}

interface Continent {
  id: string;
  name: string;
}

export default function Home() {
  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useQuery(GET_COUNTRIES);
  const {
    data: continentsData,
    loading: continentsLoading,
    error: continentsError,
  } = useQuery(GET_CONTINENTS);
  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });
  const [country, setCountry] = React.useState<Country>({
    name: "",
    code: "",
    emoji: "",
    continent: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: {
            name: country.name,
            code: country.code,
            emoji: country.emoji,
            continent: {
              id: parseInt(country.continent),
            },
          },
        },
      });
      setCountry({ name: "", code: "", emoji: "", continent: "" });
    } catch (err) {
      console.error("Error adding country:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCountry({ ...country, [name]: value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="corps p-8 flex-grow flex flex-col items-center">
        <div className="mb-6 p-4 bg-[#f0f0f0] rounded-lg shadow w-full md:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-center gap-4 max-w-[800px] mx-auto"
          >
            <div className="w-full sm:w-auto">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={country.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="w-full sm:w-auto">
              <label
                htmlFor="emoji"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Emoji
              </label>
              <input
                type="text"
                id="emoji"
                name="emoji"
                value={country.emoji}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="w-full sm:w-auto">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={country.code}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="w-full sm:w-auto">
              <label
                htmlFor="continent"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Continent
              </label>
              <select
                id="continent"
                name="continent"
                value={country.continent}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                required
              >
                <option value="">Select a continent</option>
                {continentsData?.continents.map((continent: Continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-auto flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-md color-button mt-4 sm:mt-0"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        {(countriesLoading || continentsLoading) && <p>Loading...</p>}
        {(countriesError || continentsError) && (
          <p>Error: {countriesError?.message || continentsError?.message}</p>
        )}
        {countriesData && (
          <div className="flex flex-row flex-wrap justify-center">
            {countriesData.countries.map((country: any) => (
              <Link href={`/country/${country.code}`} key={country.id}>
                <div
                  key={country.id}
                  className="p-4 m-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p>
                    {country.name} {country.emoji}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
