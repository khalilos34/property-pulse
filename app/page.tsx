import Hero from "@/components/shared/Hero";
import InfoCard from "@/components/shared/InfoCard";
import FeaturedProperties from "@/components/shared/properties/FeaturedProperties";
import RandomHomeProperties from "@/components/shared/properties/RandomHomeProperties";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoCard
              heading="For Renters"
              buttonInfo={{ text: "Browse Properties", path: "/properties" }}
              children=" Find your dream rental property. Bookmark properties and contact
              owners."
            />
            <InfoCard
              heading="For Property Owners"
              children=" List your properties and reach potential tenants. Rent as an
              airbnb or long term."
              buttonInfo={{ text: "Add Property", path: "/properties/add" }}
              backgroundColor="bg-blue-100"
            />
          </div>
        </div>
      </section>
      <FeaturedProperties />
      <RandomHomeProperties />
    </main>
  );
};

export default HomePage;
