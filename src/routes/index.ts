import { Router } from "express";
import { body, param } from "express-validator";
import {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProductByID,
  updateAvailabilityByID,
  deleteProductByID,
} from "../handlers";
import { handleInputValidation } from "../middlewares";

const router: Router = Router();

router.get("/", getAllProducts);
// ruta anidada o nesting
router
  .route("/:id")
  .get(
    param("id").isInt().withMessage("ID no válido"),
    handleInputValidation,
    getProductById
  )
  .put(
    param("id").isInt().withMessage("ID no válido"),
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price")
      .notEmpty()
      .withMessage("El precio es obligatorio")
      .isNumeric()
      .withMessage("El precio debe ser un número")
      .custom((value) => {
        if (value < 0) {
          throw new Error("El precio no puede ser negativo");
        }
        return true;
      }),
    body("stock")
      .notEmpty()
      .withMessage("El stock es obligatorio")
      .isNumeric()
      .withMessage("Cantidad de Stock es un número"),
    handleInputValidation,
    updateProductByID
  )
  .patch(
    param("id").isInt().withMessage("ID no valido"),
    handleInputValidation,
    updateAvailabilityByID
  )
  .delete(
    param("id").isInt().withMessage("ID no válido"),
    handleInputValidation,
    deleteProductByID
  );

router.post(
  "/register",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom((value) => {
      if (value < 0) {
        throw new Error("El precio no puede ser negativo");
      }
      return true;
    }),
  body("stock").notEmpty().withMessage("El stock es obligatorio"),
  handleInputValidation,
  registerProduct
);

export default router;
