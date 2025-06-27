import { employeeShift, shift } from "../../models/Shift/index.js"

export const createShift = async (req, res) => {
    try {
        const {
            name,
            start_time,
            end_time,
            duration_hours,
        } = req.body

        const createShift = new shift({
            name,
            start_time,
            end_time,
            duration_hours,
        })

        await createShift.save();
        res.status(200).json({
            message: {
                success: true,
                message: "Created Shift successfully"
            },
        })
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err?.message })
    }
}

export const employeeShiftAssign = async (req, res) => {
    try {
        const {
            employeeId,
            shiftId,
            date
        } = req.body

        const assignShift = new employeeShift({
            employeeId,
            shiftId,
            date
        })

        await assignShift.save()
        res.status(200).json({
            message: {
                success: true,
                message: "Assigned Employee Shift successfully"
            },
        })
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err?.message })
    }
}

export const getEmployeeShift = async (req,res)=>{
    try{
        const {id}=req.params
        const employeeShifts = await employeeShift.find({
            employeeId:id
        }).populate({
            path:"shiftId",model:"shiftSchema"
        }).populate({
            path: "employeeId",model:"employeeUser"
        })

         res.status(200).json({
            message: {
                success: true,
                message: "Employee Shift Retrived Successfully..."
            },
            data: employeeShifts
        })
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err?.message })
    }
}