import { slugify } from '../utils/formatter.js';
import boardModel from '../models/boardModel.js';

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const result = await boardModel.createBoard(newBoard);

    const board = await boardModel.findOneBoard(result.insertedId);
    return board;
  } catch (error) {
    throw error;
  }
};

const boardService = {
  createNew,
};
export default boardService;
