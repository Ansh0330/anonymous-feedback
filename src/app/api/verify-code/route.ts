import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "User successfully verified" },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired , Please Sign up again to get the new code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying code", error);
    return Response.json(
      { success: false, message: "Error verifying the code" },
      { status: 500 }
    );
  }
}
