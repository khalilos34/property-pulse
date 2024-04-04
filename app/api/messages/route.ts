import connectDB from "@/config/database";
import { getUser } from "@/lib/actions/user.actions";
import { Message } from "@/lib/models/message";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const POST = async (req: Request) => {
  try {
    await connectDB();
    // const formData = await req.formData();
    // const name = formData.get("name");
    // const email = formData.get("email");
    // const phone = formData.get("phone");
    // const message = formData.get("message");
    // const recipient = formData.get("recipient");
    // const property = formData.get("property");
    const { name, email, phone, message, recipient, property } =
      await req.json();
    console.log(name, email, phone, message, recipient, property);
    const user = await getUser();

    if (!user) return new Response("User is required", { status: 401 });
    // if (user._id.toString() === recipient)
    //   return new Response(
    //     JSON.stringify({ message: " you can not send a message to yourself" }),
    //     { status: 400 }
    //   );
    const newMessage = {
      sender: user._id,
      recipient,
      body: message,
      property,
      email,
      phone,
      name,
    };
    console.log(newMessage);

    await Message.create(newMessage);
    revalidatePath("/messages");

    return new Response(JSON.stringify({ massage: "Message Sent" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
};
