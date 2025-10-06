import mongoose from "mongoose";

const enhancementOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "MV-HEVC",
      "Full Side by Side",
      "Video to Audio",
      "Audio Enhancement",
      "Image Upscaling",
      "Video Compression",
      "Audio Transcription",
      "Video Denoising",
      "Face Enhancement",
      "Color Enhancement",
      "SDR → HDR Conversion",
      "Video Upscaling"
    ],
  },
  selectedOption: {
    // e.g. "Realistic" for Color Enhancement or "1080p" for Upscaling
    type: String,
    default: "",
  },
  creditsUsed: {
    type: Number,
    default: 0,
  },
});

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
  },
  b2Url: {
    type: String,
    required: true,
  },
  convertedUrl: {
    type: String,
    default: "",
  },
  creditsRefunded: {
    type: Boolean,
    default: false,
  },
  lengthInSeconds: {
    type: Number,
  },

  // ✅ Updated: now supports multiple enhancement options
  conversionFormat: {
    type: [enhancementOptionSchema],
    default: [],
  },

  totalEnhancementsSelected: {
    type: Number,
    default: 0,
  },

  totalCreditsUsed: {
    type: Number,
    default: 0,
  },

  quality: {
    type: String,
  },
  progress: {
    type: Number,
    default: 0,
  },
  creditsUsed: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: [
      "uploaded",
      "processing",
      "completed",
      "failed",
      "pending",
      "expired",
      "queued",
    ],
    default: "uploaded",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Video = mongoose.model("Video", videoSchema);
