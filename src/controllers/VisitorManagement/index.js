
import {Visitors} from '../../models/VisitorManagement/index.js';

export const newVisitor = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            company,
            purposeOfVisit,
            visitDate,
            checkInTime,
            checkOutTime,
            idProofType,
            idProofNumber,
            status,
            remarks
        } = req.body;

        const newVisitor = new Visitors({
            fullName,
            phoneNumber,
            email,
            company,
            purposeOfVisit,
            visitDate,
            checkInTime,
            checkOutTime,
            idProofType,
            idProofNumber,
            status,
            remarks
        });

        const savedVisitor = await newVisitor.save();

        return res.status(201).json({
            message: 'Visitor created successfully',
            data: savedVisitor
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error creating visitor',
            error: error.message
        });
    }
};


export const getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitors.find({})
        return res.status(200).json({
            message: 'Visitors retrieved successfully',
            data: visitors
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving visitors',
            error: error.message
        });
    }
};


export const updateVisitorById = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedVisitor = await Visitors.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedVisitor) {
            return res.status(404).json({
                message: `Visitor with ID ${id} not found`
            });
        }

        return res.status(200).json({
            message: 'Visitor updated successfully',
            data: updatedVisitor
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error updating visitor',
            error: error.message
        });
    }
};


export const deleteVisitorById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVisitor = await Visitors.findByIdAndDelete(id);

        if (!deletedVisitor) {
            return res.status(404).json({
                message: `Visitor with ID ${id} not found`
            });
        }

        return res.status(200).json({
            message: 'Visitor deleted successfully',
            data: deletedVisitor
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error deleting visitor',
            error: error.message
        });
    }
};