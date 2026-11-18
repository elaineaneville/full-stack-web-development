import mongoose from "mongoose";

const creatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    habitat: {
      type: String,
      required: true,
      trim: true,
    },
    rarity: {
      type: String,
      enum: ["common", "uncommon", "rare"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description available.",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Creature", creatureSchema);