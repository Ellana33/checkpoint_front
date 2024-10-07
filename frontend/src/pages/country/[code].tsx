import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { GET_COUNTRY } from "@/graphql/client";
import Link from "next/link";

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="corps p-8 flex-grow flex flex-col items-center">
        {country ? (
          <div className="rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-8xl font-bold mb-10">{country.emoji}</h1>
            <p>
              Name: {country.name} ({country.code})
            </p>
            <p>
              Continent:{" "}
              {country.continent ? country.continent.name : "Unknown"}
            </p>
          </div>
        ) : (
          <p>Country not found</p>
        )}
        <Link href="/">
          <button className="px-4 py-2 text-white rounded-md color-button">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
