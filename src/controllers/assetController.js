import Asset from "../models/assetModel.js";

export const createAsset = async (req, res) => {
  try {
    const newAsset = await Asset.create(req.body);
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};