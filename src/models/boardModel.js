import Joi from 'joi';
import { GET_DB_INSTANCE } from '../config/mongodb.js';
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
} from '../validations/validator.js';

// Define collection name
const BOARD_COLLECTION_NAME = 'boards';
// Define schema for board
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  slug: Joi.string().required().min(3).max(50).trim().strict(),
  columnIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  isDeleted: Joi.boolean().default(false),
});

export const validateBoard = (board) => {
  const { error } = BOARD_COLLECTION_SCHEMA.validate(board);
  if (error) {
    throw new Error(error.details.map((detail) => detail.message).join(', '));
  }
  return true;
};

const createBoard = async (board) => {
  try {
    const newBoard = await GET_DB_INSTANCE()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(board);
    return newBoard;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findOneBoard = async (boardId) => {
  try {
    const board = await GET_DB_INSTANCE()
      .collection(BOARD_COLLECTION_NAME)
      .findOne(boardId);
    return board;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Exporting the board schema for validation
export default {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneBoard,
};
