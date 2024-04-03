import connectDB from "@/config/database";
import { getUser } from "@/lib/actions/user.actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const user = await getUser();
    if (!user) return new Response("user not found", { status: 401 });
    let isPropertyBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isPropertyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== propertyId
      );
      isPropertyBookmarked = false;

      message = "Bookmark removed successfully";
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isPropertyBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isPropertyBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
