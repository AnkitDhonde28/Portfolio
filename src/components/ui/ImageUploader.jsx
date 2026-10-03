import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ImageUploader({
  slug,
  onUpload,
}) {
  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleUpload = async (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!slug) {
      setError(
        "Create an article slug first."
      );

      return;
    }

    /* -----------------------------------------------
       Validate file
    ------------------------------------------------ */

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file."
      );

      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image must be smaller than 10 MB."
      );

      return;
    }

    try {
      setUploading(true);

      /* ---------------------------------------------
         Clean filename
      --------------------------------------------- */

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "png";

      const baseName =
        file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(
            /^-+|-+$/g,
            ""
          );

      const uniqueName =
        `${Date.now()}-${baseName}.${extension}`;

      const filePath =
        `${slug}/${uniqueName}`;

      /* ---------------------------------------------
         Upload
      --------------------------------------------- */

      const {
        error: uploadError,
      } = await supabase.storage
        .from("article-images")
        .upload(
          filePath,
          file,
          {
            cacheControl: "31536000",
            upsert: false,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      /* ---------------------------------------------
         Public URL
      --------------------------------------------- */

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("article-images")
        .getPublicUrl(
          filePath
        );

      const imageUrl =
        publicUrlData?.publicUrl;

      if (!imageUrl) {
        throw new Error(
          "Could not generate image URL."
        );
      }

      onUpload({
        image: imageUrl,
        path: filePath,
        name: file.name,
      });
    } catch (err) {
      console.error(
        "Image upload error:",
        err
      );

      setError(
        err.message ||
          "Failed to upload image."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">
            Article Image
          </p>

          <p className="mt-1 text-xs text-slate-500">
            PNG, JPG, WEBP — max 10 MB
          </p>
        </div>

        <label
          className="
            inline-flex
            cursor-pointer
            items-center
            justify-center
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            font-medium
            text-slate-300
            transition
            hover:border-cyan-400
            hover:text-cyan-400
          "
        >
          {uploading
            ? "Uploading..."
            : "Upload Image"}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}