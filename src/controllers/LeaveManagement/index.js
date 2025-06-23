import { Holidays } from "../../models/LeaveManagement/index.js"

export const NewHoliday = async (req, res) => {
    try {
        const {
            holiday_name,
            holiday_date,
            holiday_type,
            description,
        } = req.body

        const holidays = new Holidays({
            holiday_name,
            holiday_date,
            holiday_type,
            description,
        });

        await holidays.save();
        res.status(200).json({
            message: {
                success: true,
                message: "Holiday added successfully"
            }
        })
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err?.message })
    }
}

export const getHolidays = async (req, res) => {
    try {
        const holidays = await Holidays.find({});

        res.status(200).json({
            success: true,
            data: holidays
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};

export const updateHoliday = async (req, res) => {
    try {
        const { uuid } = req.params;

        const updates = {
            holiday_name: req.body.holiday_name,
            holiday_date: req.body.holiday_date,
            holiday_type: req.body.holiday_type,
            description: req.body.description,
        };

        const updatedHoliday = await Holidays.findOneAndUpdate(
            { uuid: uuid },
            { $set: updates },
            { new: true }
        );

        if (!updatedHoliday) {
            return res.status(404).json({
                success: false,
                message: "Holiday not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Holiday updated successfully",
            data: updatedHoliday
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};


export const deleteHoliday = async (req, res) => {
    try {
        const { uuid } = req.params;

        const deletedHoliday = await Holidays.findOneAndDelete({ uuid });

        if (!deletedHoliday) {
            return res.status(404).json({
                success: false,
                message: "Holiday not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Holiday deleted successfully",
            data: deletedHoliday
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err?.message
        });
    }
};
