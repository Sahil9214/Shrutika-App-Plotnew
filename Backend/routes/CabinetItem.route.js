import express from 'express';
import { Router } from 'express';
import mongoose from 'mongoose';
import { CabinateItem } from '../models/CabinateItem.models.js';
const CabinetItemRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CabinetItem:
 *       type: object
 *       required:
 *         - title
 *         - quantity
 *         - cabinetId
 *         - dateOfPurchase
 *         - stock
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Item name
 *         quantity:
 *           type: string
 *           description: Quantity of the item
 *         cabinetId:
 *           type: string
 *           description: Reference to Cabinet ID
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: Expiry date of the item
 *         catalogueNumber:
 *           type: string
 *         dateOfPurchase:
 *           type: string
 *           description: Purchase date
 *         brand:
 *           type: string
 *         stock:
 *           type: string
 *         damage:
 *           type: string
 */

/**
 * @swagger
 * /api/cabinet-item/get/{cabinetId}:
 *   get:
 *     summary: Get all items in a cabinet
 *     tags: [Cabinet Items]
 *     parameters:
 *       - in: path
 *         name: cabinetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cabinet ID
 *     responses:
 *       200:
 *         description: List of items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CabinetItem'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cabinet-item/add:
 *   post:
 *     summary: Add a new item to a cabinet
 *     tags: [Cabinet Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cabinetId
 *               - title
 *               - quantity
 *               - dateOfPurchase
 *               - stock
 *             properties:
 *               cabinetId:
 *                 type: string
 *               title:
 *                 type: string
 *               quantity:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               catalogueNumber:
 *                 type: string
 *               dateOfPurchase:
 *                 type: string
 *               brand:
 *                 type: string
 *               stock:
 *                 type: string
 *               damage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
// Get Cabinet Item Request
CabinetItemRouter.get("/api/cabinet-item/get/:cabinetId", async (req, res) => {
    const { cabinetId } = req.params;
    try {
        const cabinetItemData = await CabinateItem.find({ cabinetId });
        res.status(200).send({ data: cabinetItemData, message: "Cabinet item data retrieval successful" });
    } catch (error) {
        console.error("Error fetching cabinet item data:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Add Cabinet Item Request
CabinetItemRouter.post("/api/cabinet-item/add", async (req, res) => {
    try {
        const {
            cabinetId,
            title,
            quantity,
            expiryDate,
            catalogueNumber,
            dateOfPurchase,
            brand,
            stock,
            damage
        } = req.body;

        // Validate required fields
        if (!cabinetId || !title || !quantity || !dateOfPurchase || !stock) {
            return res.status(400).send({
                msg: "Cabinet ID, title, quantity, date of purchase, and stock are required"
            });
        }

        const newCabinetItem = new CabinateItem({
            cabinetId,
            title,
            quantity,
            expiryDate,
            catalogueNumber,
            dateOfPurchase,
            brand,
            stock,
            damage
        });

        await newCabinetItem.save();
        res.status(201).send({ data: newCabinetItem, message: "Cabinet item added successfully" });
    } catch (error) {
        console.error("Error adding cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Delete Cabinet Item Request
CabinetItemRouter.delete("/api/cabinet-item/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet item ID" });
        }
        const cabinetItem = await CabinateItem.findByIdAndDelete(id);
        if (!cabinetItem) {
            return res.status(404).send({ msg: "Cabinet item not found" });
        }
        res.status(200).send({ data: cabinetItem, message: "Cabinet item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Patch Cabinet Item Request
CabinetItemRouter.patch("/api/cabinet-item/patch/:id", async (req, res) => {
    console.log("patch request received", req.params.id);
    console.log("patch request body", req.body);
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet item ID" });
        }
        const updatedCabinetItem = await CabinateItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCabinetItem) {
            return res.status(404).send({ msg: "Cabinet item not found" });
        }
        res.status(200).send({ data: updatedCabinetItem, message: "Cabinet item updated successfully" });
    } catch (error) {
        console.error("Error updating cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default CabinetItemRouter;