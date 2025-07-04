import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "Invalid username format",
          errors: usernameError,
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    // Check if the username already exists in the database
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUser) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 409 }
      );
    }

    return Response.json(
      { success: true, message: "Username is available" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      { success: false, message: "Error checking the username" },
      { status: 500 }
    );
  }
}
