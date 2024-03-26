import PropertyCard from "@/components/shared/properties/PropertyCard";
import SearchForm from "@/components/shared/properties/SearchForm";
import { propertiesData } from "@/constants/properties";
import React from "react";

const PropertiesPage = () => {
  return (
    <div>
      <SearchForm />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertiesData.map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
