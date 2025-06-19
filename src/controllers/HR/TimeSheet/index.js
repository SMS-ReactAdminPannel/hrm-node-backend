import { log } from "console";
import { TimeEntryModel, TimesheetModel } from "../../../models/HR/TimeSheet/index.js";
import { startOfDay, format } from "date-fns";

// Clock In
export const clockIn = async (req, res) => {
  try {
    const { employee_id, location, notes } = req.body;

    const existingEntry = await TimeEntryModel.findOne({
      employee_id,
      clockOut: { $exists: false }
    });

    if (existingEntry) {
      return res.status(400).json({ error: 'You have an open time entry' });
    }

    const timeEntry = new TimeEntryModel({
      employee_id,
      date: new Date(),
      clockIn: new Date(),
      location,
      notes,
      status: 'draft'
    });

    await timeEntry.save();
    res.status(200).json(timeEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Clock Out
export const clockOut = async (req, res) => {
  try {
    const { employee_id, notes } = req.body;

    const timeEntry = await TimeEntryModel.findOne({
      employee_id,
      clockOut: { $exists: false }
    }).sort({ clockIn: -1 });

    if (!timeEntry) {
      return res.status(404).json({ error: 'No open time entry found' });
    }

    timeEntry.clockOut = new Date();
    timeEntry.notes = notes || timeEntry.notes;

    const msWorked = timeEntry.clockOut - timeEntry.clockIn;
    timeEntry.totalHours = msWorked / (1000 * 60 * 60); // Convert ms to hours
    timeEntry.regularHours = Math.min(timeEntry.totalHours, 8);
    timeEntry.overtimeHours = Math.max(timeEntry.totalHours - 8, 0);

    await timeEntry.save();
    res.json(timeEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getsubmitTimesheet = async (req, res) => {
  try {
    const { employee_id, startDate, endDate } = req.body;

    const entries = await TimeEntryModel.find({
      employee_id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    if (entries.length === 0) {
      return res.status(400).json({ error: 'No time entries found for this period' });
    }

    const totalHours = entries.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);

    const timesheet = new TimesheetModel({
      employee_id,
      startDate,
      endDate,
      entries: entries.map(e => e._id),
      totalHours,
      status: 'submitted'
    });

    await timesheet.save();
    res.status(201).json(timesheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve Timesheet
export const approveTimesheet = async (req, res) => {
  try {
    const { timesheetId } = req.params;
    const { approverId, comment } = req.body;

    const timesheet = await TimesheetModel.findById(timesheetId);
    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }

    timesheet.status = 'approved';
    timesheet.approvedBy = approverId;
    timesheet.approvalDate = new Date();
    timesheet.rejectionReason = comment || '';

    await timesheet.save();

    // Update entries
    await TimeEntryModel.updateMany(
      { _id: { $in: timesheet.entries } },
      { $set: { status: 'approved' } }
    );

    res.json(timesheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getemployeetimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "timesheet")
    const timesheet = await TimeEntryModel.find({ employee_id: id })
    console.log(timesheet, "tm")
    if (!timesheet) {
      return res.status(404).json({ error: "Timesheet not found" });
    }

    res.status(200).json({ data: timesheet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

// export const getTimeEntriesByDateRange = async (req, res) => {
//   try {
//     const { employee_id, startDate, endDate } = req.query;

//     // Check required params
//     if (!employee_id || !startDate || !endDate) {
//       return res.status(400).json({ error: 'employee_id, startDate, and endDate are required' });
//     }

//     // Validate employee_id
//     if (!mongoose.Types.ObjectId.isValid(employee_id)) {
//       return res.status(400).json({ error: 'Invalid employee_id format' });
//     }

//     // Parse and validate dates
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//       return res.status(400).json({ error: 'Invalid date format' });
//     }

//     // Find time entries
//     const entries = await TimeEntryModel.find({
//       employee_id,
//       date: { $gte: start, $lte: end }
//     }).sort({ date: 1 });

//     console.log(entries, "entriessssssssssssssss kamal")

//     if (entries.length === 0) {
//       return res.status(404).json({ message: 'No time entries found for this period' });
//     }

//     res.status(200).json({
//       message: 'Time entries retrieved successfully',
//       data: entries
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
