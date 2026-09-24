import { Router } from "express";
import { login, register, auth, logout } from "./controller/user-controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { deleteProduct, getProducts } from "./controller/product-controller";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rotas de produto
router.get("/products", getProducts);
router.delete("/delproduct/:id", deleteProduct);
