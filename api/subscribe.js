import { createClient } from "@supabase/supabase-js";

/* =========================================================
   EMAIL VALIDATION
========================================================= */

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
    email.trim()
  );
};

/* =========================================================
   API HANDLER
========================================================= */

export default async function handler(req, res) {
  /* =======================================================
     ONLY POST REQUESTS
  ======================================================= */

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    /* =====================================================
       SERVER ENVIRONMENT VARIABLES
    ===================================================== */

    const {
      SUPABASE_URL,
      SUPABASE_SECRET_KEY,
    } = process.env;

    /* =====================================================
       CHECK SERVER CONFIGURATION
    ===================================================== */

    if (
      !SUPABASE_URL ||
      !SUPABASE_SECRET_KEY
    ) {
      console.error(
        "Missing Supabase server environment variables."
      );

      return res.status(500).json({
        message: "Server configuration error.",
      });
    }

    /* =====================================================
       CREATE SUPABASE SERVER CLIENT
    ===================================================== */

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SECRET_KEY
    );

    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    const {
      name,
      email,
    } = req.body || {};

    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        message: "Please enter your name.",
      });
    }

    const cleanName = name.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Please enter a valid name.",
      });
    }

    if (cleanName.length > 100) {
      return res.status(400).json({
        message: "Name is too long.",
      });
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        message:
          "Please enter your email address.",
      });
    }

    const cleanEmail =
      email.trim().toLowerCase();

    if (cleanEmail.length > 254) {
      return res.status(400).json({
        message: "Email address is too long.",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        message:
          "Please enter a valid email address.",
      });
    }

    /* =====================================================
       INSERT SUBSCRIBER
    ===================================================== */

    const {
      error,
    } = await supabase
      .from("subscribers")
      .insert([
        {
          name: cleanName,
          email: cleanEmail,
        },
      ]);

    /* =====================================================
       DATABASE ERROR
    ===================================================== */

    if (error) {
      console.error(
        "Supabase insert error:",
        error
      );

      /* Duplicate email */
      if (error.code === "23505") {
        return res.status(409).json({
          message:
            "This email is already subscribed.",
        });
      }

      return res.status(500).json({
        message:
          "Unable to save your subscription. Please try again.",
      });
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return res.status(200).json({
      success: true,
      message:
        "You're subscribed successfully!",
    });
  } catch (error) {
    /* =====================================================
       UNEXPECTED ERROR
    ===================================================== */

    console.error(
      "Subscribe API error:",
      error
    );

    return res.status(500).json({
      message:
        "Server configuration error.",
    });
  }
}