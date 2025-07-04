import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { isAcceptingMessage: acceptMessages },
        { new: true }
      );
      if (!updatedUser) {
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "User message acceptance updated",
          updatedUser,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error parsing request body", error);
      return Response.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error accepting messages", error);
    return Response.json(
      { success: false, message: "Error accepting messages" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
  
    return Response.json(
      { success: true, isAcceptingMessage: foundUser.isAcceptingMessage  },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting user message acceptance status", error);
    return Response.json(
      { success: false, message: "Error fetching user acceptance status" },
      { status: 500 }
    );
    
  }
}
