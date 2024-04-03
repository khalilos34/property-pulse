import connectDB from "@/config/database";
import Property from "@/lib/models/property";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const locationPattern = location ? new RegExp(location, "i") : null;

    let query: any = {};
    const orConditions: any[] = [];

    if (locationPattern) {
      orConditions.push(
        { name: locationPattern },
        { description: locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.street": locationPattern }
      );
    }

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    const properties = await Property.find(query);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
