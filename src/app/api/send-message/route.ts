import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, content } = await request.json();
    if (!username || !content) {
      return Response.json(
        { success: false, message: "Username and content are required" },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // is user accepting messages?
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 }
      );
    }

    // Create a new message
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    // Add the message to the user's messages array
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message", error);
    return Response.json(
      { success: false, message: "Error sending message" },
      { status: 500 }
    );
  }
}
