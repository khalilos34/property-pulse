import connectDB from "@/config/database";
import { getUser } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const user = await getUser();
    if (!user) return new Response("user not found", { status: 401 });
    let isPropertyBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isPropertyBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
