import { fetchFeaturedProperty } from "@/lib/actions/properties.actions";
import FeaturedPropertiesCard from "./FeaturedPropertiesCard";

const FeaturedProperties = async () => {
  const properties = await fetchFeaturedProperty();
  if (!properties) return <p> there is no featured properties</p>;
  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property, i) => (
            <div key={i}>
              <FeaturedPropertiesCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
