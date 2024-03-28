import connectDB from "@/config/database";
import { createProperty } from "@/lib/actions/properties.actions";
import { getUser } from "@/lib/actions/user.actions";
import Property from "@/lib/models/property";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();
    const user = await getUser();

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images");
    const propertyData = {
      owner: user?._id,
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      amenities: amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      surface: formData.get("surface"),
      //   images: images,
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };
    await connectDB();
    const newProperty = new Property(propertyData);
    await newProperty.save();
    return Response.redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    return new Response("error", { status: 500 });
  }
};
