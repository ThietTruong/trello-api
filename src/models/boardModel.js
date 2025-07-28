import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { create } from "domain";
import Joi from "joi";

// Define collection name
const BOARD_COLLECTION_NAME = "boards";
// Define schema for board
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  slug: Joi.string().required().min(3).max(50).trim().strict(),
  columnIds: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date()
    .timestamp("javascript")
    .default(() => new Date(), "time of creation"),
  updatedAt: Joi.date().timestamp("javascript").default(null, "time of update"),
  isDeleted: Joi.boolean().default(false),
});

export { BOARD_COLLECTION_NAME, BOARD_COLLECTION_SCHEMA };
// Exporting the board schema for validation
export const validateBoard = (board) => {
  const { error } = BOARD_COLLECTION_SCHEMA.validate(board);
  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(", "));
  }
  return true;
};
// Exporting the board schema for validation
