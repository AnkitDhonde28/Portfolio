import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid session",
      });
    }

    // Only YOUR admin email can access this API.
    if (
      user.email?.toLowerCase() !==
      process.env.ADMIN_EMAIL?.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { data, error } = await supabase
      .from("subscribers")
      .select("id, name, email, subscribed_at")
      .order("subscribed_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch subscribers",
      });
    }

    return res.status(200).json({
      success: true,
      subscribers: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}