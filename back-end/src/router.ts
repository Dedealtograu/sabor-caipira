import { Router } from "express";
import { login, register, auth, logout } from "./controller/user-controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { deleteProduct, getProductById, getProducts } from "./controller/product-controller";
import { getDeskItems, createDeskItem, deleteDeskItem, incrementQuantity, decrementQuantity } from "./controller/desk-controller";
import { closeOrder, createOrder, getAllOrders, getOrdersByDeskNumber, updateOrder } from "./controller/order-controller";
import { getOrderItemByOrderId } from "./controller/order-item-controller";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, auth);
router.post("/logout", authMiddleware, logout);

// Rotas de produto
router.get("/products", getProducts);
router.get("/product/:id", authMiddleware, getProductById);
router.delete("/delproduct/:id", authMiddleware, deleteProduct);

// Rotas de mesa
router.get("/desks", authMiddleware, getDeskItems);
router.post("/desk", authMiddleware, createDeskItem);
router.delete("/deldesk/:id", authMiddleware, deleteDeskItem);
router.put("/desk/increment/:id", authMiddleware, incrementQuantity);
router.put("/desk/decrement/:id", authMiddleware, decrementQuantity);

// Rotas de pedido
router.get("/orders", authMiddleware, getAllOrders);
router.post("/order", authMiddleware, createOrder);
router.put("/order/:id", authMiddleware, updateOrder);
router.post("/orders/desknumber", authMiddleware, getOrdersByDeskNumber);
router.post("/orders/close", authMiddleware, closeOrder);
