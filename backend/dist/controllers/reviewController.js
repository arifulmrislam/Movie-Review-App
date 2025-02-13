"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewById = exports.updateReviewById = exports.addReview = void 0;
const models_1 = __importDefault(require("../models"));
const RR = models_1.default.RR;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rr = yield RR.create(req.body);
        res.status(201).json(rr);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create review" });
    }
});
exports.addReview = addReview;
const updateReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const rr = yield RR.findByPk(id);
        if (!rr) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        yield rr.update(updatedData);
        res.status(200).json(rr);
    }
    catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Failed to update review" });
    }
});
exports.updateReviewById = updateReviewById;
const deleteReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rr = yield RR.destroy({
            where: {
                rr_id: id
            }
        });
        res.status(200).json({ deleted: true });
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Failed to delete review" });
    }
});
exports.deleteReviewById = deleteReviewById;
//# sourceMappingURL=reviewController.js.map