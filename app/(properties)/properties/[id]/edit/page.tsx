import AddPropertyForm from "@/components/shared/AddPropertyForm";
import EditProperty from "@/components/shared/EditProperty";
import { fetchPropertyById } from "@/lib/actions/properties.actions";
import { auth } from "@clerk/nextjs";

const EditPropertyPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchPropertyById(params.id);
  if (!property) throw new Error("property not found!");
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <EditProperty property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
