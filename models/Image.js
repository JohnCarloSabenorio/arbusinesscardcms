const supabase = require("../utils/supabaseClient");

class Image {
  constructor(imageBucket, imageFileName) {
    this.imageBucket = imageBucket;
    this.imageFileName = imageFileName;
  }

  static async getImage(image_id) {
    const { data: imageData, error: imageError } = await supabase
      .from("image")
      .select("image_bucket, image_filename")
      .eq("image_id", image_id)
      .single();

    if (!imageData) {
      console.error("Image is not in the database!");
      return null;
    }
    const imageBucket = imageData.image_bucket.split("/");
    const fname = `${imageBucket[1]}/${imageData.image_filename}`;
    const { data, error } = await supabase.storage
      .from(imageBucket[0])
      .createSignedUrls([fname], 60);

    if (error) {
      console.error("Error generating signed URLs:", error);
      return;
    }

    // Output the signed URLs
    data.forEach((file) => {
      console.log(`File: ${file.path}`);
      console.log(`Signed URL: ${file.signedURL}`);
    });

    return data; // Returning data if needed for further processing
  }
}

module.exports = Image;
