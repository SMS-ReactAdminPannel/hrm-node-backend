import express from 'express';
import {
  clockIn,
  clockOut,
  approveTimesheet,
  getsubmitTimesheet,
  getemployeetimesheet
} from '../../../controllers/HR/TimeSheet/index.js';

const TimeSheetrouter = express.Router();

TimeSheetrouter.post('/clock-in', clockIn);
TimeSheetrouter.post('/clock-out', clockOut);
TimeSheetrouter.get('/submit', getsubmitTimesheet);
TimeSheetrouter.patch('/approve/:timesheetId', approveTimesheet);
TimeSheetrouter.get('/:id',getemployeetimesheet)

export default TimeSheetrouter;
