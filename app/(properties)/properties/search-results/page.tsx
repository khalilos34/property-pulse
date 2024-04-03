"use client";
import Spinner from "@/components/shared/Spinner";
import PropertyCard from "@/components/shared/properties/PropertyCard";
import SearchForm from "@/components/shared/properties/SearchForm";
import { IProperty } from "@/lib/models/property";
import { useEffect, useState } from "react";

const SearchResultsPage = ({
  searchParams,
}: {
  searchParams: { location: string; propertyType: string };
}) => {
  const { location, propertyType } = searchParams;
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (result.status === 200) {
          const data = await result.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [location, propertyType]);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div>
      <SearchForm />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-8">
            Key words : {location === "" ? "" : `${location} , `}
            {propertyType === "All" ? "" : propertyType}
          </h1>

          {properties.length == 0 ? (
            <p>No Properties matches your search</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property, i) => (
                <div key={i}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;
