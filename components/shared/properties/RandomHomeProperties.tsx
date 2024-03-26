import { propertiesData } from "@/constants/properties";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const RandomHomeProperties = () => {
  const randomProperty = propertiesData
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Random Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomProperty.map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default RandomHomeProperties;