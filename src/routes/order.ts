import { Router } from "express";
import { createOrder, getOrderById, listOrders } from "../controller/orders";
import { authorization } from "../middlewares/authorization";
import { PERMISSIONS } from "../constants";

const router = Router();

router.post("/orders", authorization([PERMISSIONS.ORDERS.EDIT]), createOrder);
router.get("/orders", authorization([PERMISSIONS.ORDERS.READ]), listOrders);
router.get(
  "/orders/:id",
  authorization([PERMISSIONS.ORDERS.READ]),
  getOrderById
);
export default router;
