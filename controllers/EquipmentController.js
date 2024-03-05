import EquipmentCategoryModel from "../models/EquipmentCategoryModel.js"
import EquipmentModel from "../models/EquipmentModel.js";



export const createEquipmentCategoryController = async (req, res) => {
    try {
        const {equipment_category} = req.body;
       
        //validation
        if(!equipment_category){
            console.log("equipment_category should not be empty found");
        }
        if(req.body.keywords){
            const {equipment_category,keywords} = req.body;
            const data = {equipment_category,keywords}
            const product = await new EquipmentCategoryModel({equipment_category,keywords}).save()
        }
        else{
            const {equipment_category} = req.body;
            const product = await new EquipmentCategoryModel({equipment_category}).save()
        }
        res.status(201).send({
            success: true,
            message: "Equipment Category created successfully!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating Euipment Category",
            error
        })    
    }
}




export const postEquipmentController = async (req, res) => {
    try {
        // Extracting data from the request body
        const { equipment_category_id, equipment_desc, equipment_model, license, owner_id } = req.body;

        // Validation
        if (!equipment_category_id || !equipment_desc || !equipment_model || !license || !owner_id) {
            return res.status(400).send({ success: false, message: 'All fields are required.' });
        }

        // Create new equipment object
        const equipment = new EquipmentModel({
            equipment_category_id,
            equipment_desc,
            equipment_model,
            license,
            owner_id
        });

        // Save equipment to the database
        await equipment.save();

        // Respond with success message
        res.status(201).send({ success: true, message: 'Equipment created successfully.', equipment });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating Euipment Category",
            error
        })    
    }
}

export const getEquipmentCategoryController = async(req,res) => {
    try{
        console.log("before fetch command");
        // Fetch all equipment categories from the database
        const categories = await EquipmentCategoryModel.find();

        // Return the categories as JSON response
        // res.json(categories);
        console.log("fetch line executed successfully");
        res.status(200).send({
            success: true,
            message: true,
            message: "All categories",
            categories
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in listing Euipment Category",
            error
        })    
    }
}
// This listing is without the equipment owner data
export const getEquipmentController = async (req, res) => {
    try {
        // Get the user's id from the request
        const userId = req.user._id; // Assuming the user id is available in req.user._id

        // Code to get all the equipments excluding those owned by the user
        const equipments = await EquipmentModel.find().populate("owner_id");
        const categories = await EquipmentCategoryModel.find();

        res.status(200).send({
            success: true,
            message: "All equipment fetched!",
            equipments,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in getting the equipments",
            success: false
        });
    }
};


// export const getEquipmentController = async (req, res) => {
//     try {
//         // Get the user's id from the request
//         const userId = req.user._id; // Assuming the user id is available in req.user._id

//         // Code to get all the equipments excluding those owned by the user
//         const equipments = await EquipmentModel.find({ owner_id: { $ne: userId } })
//             .populate({
//                 path: 'owner_id',
//                 model: userModel, // Use the imported User model
//                 select: 'name email phone address' // Include fields you want to select from User model
//             });
        
//         const categories = await EquipmentCategoryModel.find();

//         res.status(200).send({
//             success: true,
//             message: "All equipment fetched!",
//             equipments,
//             categories
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: "Error in getting the equipments",
//             success: false
//         });
//     }
// };


export const getEquipmentListing = async (req, res) => {
    try {
        // Get the user's id from the request
        const userId = req.user._id;

        // Code to get equipments owned by the current user
        const equipments = await EquipmentModel.find({ owner_id: userId });
        const categories = await EquipmentCategoryModel.find();

        res.status(200).send({
            success: true,
            message: "User's equipment fetched!",
            equipments,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in getting the user's equipments",
            success: false
        });
    }
};