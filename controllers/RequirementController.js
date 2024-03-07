import PotentialModel from "../models/PotentialModel.js";
import RequirementModel from "../models/RequirementModel.js";

export const postRequirementController = async (req, res) => {
  try {
    const { quantity, price, date, notes, buyerId, sellerId, productId } =
      req.body;

    // Generate combinedId
    const combinedId = `${sellerId}_${productId}_${buyerId}`;

    const requirement = await RequirementModel.create({
      quantity,
      price,
      date,
      notes,
      buyerId,
      sellerId,
      productId,
      combinedId,
    });

    res.status(201).send({
      success: true,
      message: "Requirement created successfully!",
      requirement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating requirement",
      error,
    });
  }
};

//get requirements other buyers post to buy the product


export const getRequirementController = async (req, res) => {
  try {
    const { sellerId, productId } = req.body;

    if (!sellerId || !productId) {
      return res.status(400).json({
        success: false,
        message: "SellerId or ProductId not provided",
      });
    }

    // Find all documents that match the sellerId and productId
    const requirements = await RequirementModel.find({ sellerId, productId }).populate("buyerId").populate("productId").populate("sellerId")
      .sort({ createdAt: -1 }); // Convert documents to plain JavaScript objects

    // If no requirements are found, return 404
    if (!requirements || requirements.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No requirements found for the specified sellerId and productId",
      });
    }

    const result=requirements;

    res.status(200).json({
      success: true,
      message: "Latest requirements fetched successfully",
      result,
    });
    
  } catch (error) {
    console.error("Error in fetching requirements:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching requirements",
      error: error.message,
    });
  }
};


// potential leads to be displayed from potential model

export const postPotentialController = async (req, res) => {
  try {
    const {
      name,
      buyerId,
      notes,
      price,
      date,
      organic,
      quantity,
      quantityUnit,
      shipping,
    } = req.body;

    // Generate combinedId

    const result = await new PotentialModel({
      name,
      buyerId,
      notes,
      price,
      date,
      organic,
      quantity,
      quantityUnit,
      shipping,
    }).save();

    if (!result) {
      return res.status(500).send({
        success: false,
        message: "not found",
      });
    }

    res.status(201).send({
      success: true,
      message: "Potential posted successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting potential",
      error,
    });
  }
};
