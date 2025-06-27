import { LeaveType } from "../../models/LeaveTypeManagement/index.js"

export const createLeaveType = async (req, res) => {
    try {
        const {
            title,
            description,
            is_paid,
            max_days
        } = req.body

        const leaveType = new LeaveType({
            title,
            description,
            is_paid,
            max_days
        })

        await leaveType.save();
        res.status(200).json({
            message: {
                success: true,
                message: "LeaveType Added successfully"
            },
        })
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err?.message })
    }
}

export const getall = async (req, res) => {
    try {
        const AllLeaveTypes = await LeaveType.find();

        res.status(200).json({
            success: true,
            data: AllLeaveTypes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};

export const getUniqueLeave = async (req, res) => {
    try {
        const { uuid } = req.params;

        const leaveType = await LeaveType.findOne({ uuid });

        if (!leaveType) {
            return res.status(404).json({
                success: false,
                message: "Leave type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: leaveType
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};

export const updateLeaveType = async (req, res) => {
    try {
        const { uuid } = req.params;

        const updates = {
            title: req.body.title,
            description: req.body.description,
            is_paid: req.body.is_paid,
            max_days: req.body.max_days,
        };

        const updatedLeave = await LeaveType.findOneAndUpdate(
            { uuid: uuid },
            { $set: updates },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({
                success: false,
                message: "Leave not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Leave updated successfully",
            data: updatedLeave
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};

export const deleteLeave = async (req, res) => {
    try {
        const { uuid } = req.params;

        const deleteLeave = await LeaveType.findOneAndDelete({ uuid });

        if (!deleteLeave) {
            return res.status(404).json({
                success: false,
                message: "Leave not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Leave deleted successfully",
            data: deleteLeave
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};