import express from 'express';
import {
  clockIn,
  clockOut,
  submitTimesheet,
  approveTimesheet
} from '../../../controllers/HR/TimeSheet/index.js';

const TimeSheetrouter = express.Router();

TimeSheetrouter.post('/clock-in', clockIn);

TimeSheetrouter.post('/clock-out', clockOut);

TimeSheetrouter.post('/submit', submitTimesheet);

TimeSheetrouter.patch('/approve/:timesheetId', approveTimesheet);

export default TimeSheetrouter;
