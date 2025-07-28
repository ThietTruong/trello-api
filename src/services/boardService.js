import { slugify } from "../utils/formatter.js";
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    return newBoard;
  } catch (error) {
    throw error;
  }
};
const boardService = {
  createNew,
};
export default boardService;
