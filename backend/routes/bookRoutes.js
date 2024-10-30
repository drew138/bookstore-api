import express from "express";
import {
  getBooks,
  getBooksById,
  sendBooksEmail,
} from "../controller/bookController.js";

const router = express.Router();

router.route("/").get(getBooks);
router.route("/sendEmail").post(sendBooksEmail);

router.route("/:id").get(getBooksById);

export default router;
