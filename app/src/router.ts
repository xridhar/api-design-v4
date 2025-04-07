import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/products";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/updates";
const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getProduct);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", handleInputErrors, deleteProduct);

/**
 * Update
 */
router.get("/update", handleInputErrors, getUpdates);

router.get("/update/:id", handleInputErrors, getOneUpdate);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional().isString(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", (req, res) => {
  res.json({
    message: "updatepoint",
  });
});

router.get("/updatepoint/:id", (req, res) => {
  //
});

router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req, res) => {
    //
  }
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {
    //
  }
);

router.delete("/updatepoint/:id", (req, res) => {
  //
});

export default router;
