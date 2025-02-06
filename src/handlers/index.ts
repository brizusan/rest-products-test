import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ msg: "Error al traer los productos" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return;
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ msg: "Error al traer el producto" });
  }
};

export const registerProduct = async (req: Request, res: Response) => {
  const {price} = req.body
  try {
    const product = await Product.create({
      ...req.body,
      price: Number(price)
    });
    console.log(product)
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar producto" });
  }
};

export const updateProductByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return;
    }
    await product.update(req.body);
    res.status(200).json({ msg: "Producto actualizado" });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar el producto" });
  }
};

export const updateAvailabilityByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ msg: "Producto no encontrado" });
    return;
  }
  product.availability = !product.availability;
  await product.save();
  res.status(200).json({ msg: "Producto actualizado" });
};

export const deleteProductByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado" });
      return;
    }
    await product.destroy();
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar el producto" });
  }
};
