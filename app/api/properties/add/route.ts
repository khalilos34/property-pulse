import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import { getUser } from "@/lib/actions/user.actions";
import Property from "@/lib/models/property";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();
    const user = await getUser();
    if (!user) throw new Error(`User not found`);

    const propertyData = {
      owner: user._id,
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
      amenities: formData.getAll("amenities"),
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      surface: formData.get("surface"),
      images: formData.getAll("images"),
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };
    const imageUploadPromises = propertyData.images.map(async (image: any) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property_pulse",
        }
      );
      return result.secure_url;
    });
    const uploadedImages = await Promise.all(imageUploadPromises);
    const propertyToCreate = { ...propertyData, images: uploadedImages };

    await connectDB();
    const newProperty = await Property.create(propertyToCreate);

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response("error", { status: 500 });
  }
};
