import PropertyCard from "@/components/shared/properties/PropertyCard";
import PropertyHeader from "@/components/shared/propertyDetails/PropertyHeader";
import PropertyInfo from "@/components/shared/propertyDetails/PropertyInfo";
import PropertySearch from "@/components/shared/propertyDetails/PropertySearch";
import Sidebar from "@/components/shared/propertyDetails/Sidebar";
import { fetchPropertyById } from "@/lib/actions/properties.actions";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }: { params: { id: string } }) => {
  const propertyId = params.id;
  const property = await fetchPropertyById(propertyId);
  if (!property) return "";

  return (
    <>
      <PropertySearch />
      <PropertyHeader src={property.images[0]} />

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
            Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyInfo property={property} />
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
