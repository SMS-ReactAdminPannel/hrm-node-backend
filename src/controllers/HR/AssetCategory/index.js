import { AssetCategoryModel, AssetModel } from "../../../models/HR/AssetCategory/index.js"

// CREATE Asset
export const createAssetCategory = async (req, res) => {
  try {
    const assetData = req.body

    const newAsset = new AssetCategoryModel(assetData)
    await newAsset.save()

    res.status(201).json({ success: true, message: "Asset created successfully", data: newAsset })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create asset", error: error.message })
  }
}

// GET All Assets (excluding soft-deleted)
export const getAllAssetCategory = async (req, res) => {
  try {
    const assets = await AssetCategoryModel.find({ is_deleted: false })
    res.status(200).json({ success: true, data: assets })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch assets", error: error.message })
  }
}

// GET Asset by ID
export const getAssetCategoryById = async (req, res) => {
  try {
    const asset = await AssetCategoryModel.findById(req.params.id)

    if (!asset || asset.is_deleted) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    res.status(200).json({ success: true, data: asset })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch asset", error: error.message })
  }
}

// UPDATE Asset by ID
export const updateAssetCategory = async (req, res) => {
  try {
    const updatedAsset = await AssetCategoryModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )

    if (!updatedAsset) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    res.status(200).json({ success: true, message: "Asset updated", data: updatedAsset })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update asset", error: error.message })
  }
}

// SOFT DELETE Asset by ID
export const deleteAssetCategory = async (req, res) => {
  try {
    const asset = await AssetCategoryModel.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    )

    if (!asset) {
      return res.status(404).json({ success: false, message: "Asset not found" })
    }

    res.status(200).json({ success: true, message: "Asset soft-deleted", data: asset })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete asset", error: error.message })
  }
}


// CREATE Asset Group
export const createAsset = async (req, res) => {
  try {
    const { asset, category_name, description } = req.body;

    // Optional: validate referenced asset IDs exist
    const existingAssets = await AssetCategoryModel.find({ _id: { $in: asset }, is_deleted: false });
    if (existingAssets.length !== asset.length) {
      return res.status(400).json({ success: false, message: "One or more AssetCategory IDs are invalid" });
    }

    const newAssetGroup = new AssetModel({
      asset,
      category_name,
      description,
    });

    await newAssetGroup.save();

    res.status(201).json({ success: true, message: "Asset group created", data: newAssetGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create asset group", error: error.message });
  }
};

// GET All Asset Groups
export const getAllAssets = async (req, res) => {
  try {
    const assets = await AssetModel.find({ is_deleted: false }).populate("asset");
    res.status(200).json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch assets", error: error.message });
  }
};

// GET Asset Group by ID
export const getAssetById = async (req, res) => {
  try {
    const assetGroup = await AssetModel.findById(req.params.id).populate("asset");

    if (!assetGroup || assetGroup.is_deleted) {
      return res.status(404).json({ success: false, message: "Asset group not found" });
    }

    res.status(200).json({ success: true, data: assetGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch asset group", error: error.message });
  }
};

// UPDATE Asset Group
export const updateAsset = async (req, res) => {
  try {
    const { asset, category_name, description } = req.body;

    const updatedAssetGroup = await AssetModel.findByIdAndUpdate(
      req.params.id,
      { asset, category_name, description },
      { new: true }
    ).populate("asset");

    if (!updatedAssetGroup) {
      return res.status(404).json({ success: false, message: "Asset group not found" });
    }

    res.status(200).json({ success: true, message: "Asset group updated", data: updatedAssetGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update asset group", error: error.message });
  }
};

// SOFT DELETE Asset Group
export const deleteAsset = async (req, res) => {
  try {
    const deletedAsset = await AssetModel.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );

    if (!deletedAsset) {
      return res.status(404).json({ success: false, message: "Asset group not found" });
    }

    res.status(200).json({ success: true, message: "Asset group deleted", data: deletedAsset });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete asset group", error: error.message });
  }
};
