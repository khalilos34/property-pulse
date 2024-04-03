import PropertyCard from "@/components/shared/properties/PropertyCard";
import SearchForm from "@/components/shared/properties/SearchForm";
import { fetchBookmarkedProperties } from "@/lib/actions/properties.actions";
import { auth } from "@clerk/nextjs";

const BookmarkedProperties = async () => {
  const { userId } = auth();
  if (!userId) return new Error("user not found");
  const bookmarkedProperties = await fetchBookmarkedProperties(userId);
  if (!bookmarkedProperties) return <p>there us no property</p>;
  return (
    <div>
      <SearchForm />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-8">Properties saved </h1>

          {bookmarkedProperties.length == 0 ? (
            <p>No saved Properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookmarkedProperties.map((property, i) => (
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

export default BookmarkedProperties;
