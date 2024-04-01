import PropertyListingCard from "@/components/shared/profile/PropertyListingCard";
import { fetchPropertyByUserId } from "@/lib/actions/properties.actions";
import { getUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await getUser();
  if (!user) throw new Error(`User not found`);
  const { userId } = auth();
  if (!userId) throw new Error(`User not found`);
  const properties = await fetchPropertyByUserId(user._id);
  if (!properties) throw new Error(`properties not found`);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={user.photo}
                  alt="User"
                  height={0}
                  width={0}
                  sizes="100vw"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block"> Full Name: </span>
                {user.first_name} {user.last_name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties &&
                properties?.map((property) => (
                  <div key={property._id}>
                    <PropertyListingCard property={property} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
