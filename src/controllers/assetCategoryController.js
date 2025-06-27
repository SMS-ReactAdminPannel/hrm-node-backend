import AssetCategory from "../models/AssetCategory.js";

// ✅ CREATE
export const createCategory = async (req, res) => {
  try {
    const newCategory = new AssetCategory(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category", message: err.message });
  }
};

// ✅ READ ALL
export const getAllCategories = async (req, res) => {
  try {
    const categories = await AssetCategory.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// ✅ READ SINGLE
export const getCategoryById = async (req, res) => {
  try {
    const category = await AssetCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// ✅ UPDATE
export const updateCategory = async (req, res) => {
  try {
    const updated = await AssetCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// ✅ DELETE
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await AssetCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};