import { PayrollModel } from "../../../models/HR/Payroll/index.js";


export const setPayrollStructure = async (req, res)=>{
    try{
        const {employeeId} = req.params;
        const {basic, allowances,deductions} =req.body;

    
    const PayrollModels =new PayrollModel({
        employee:employeeId,
        basic,
        allowances,
        deductions

    });
    await PayrollModels.save();
    res.status(201).json({message:'Payroll structure saved.'});

} catch (err) {
    res.status(500).json({error:err.message});
}
};
export const generatePayroll = async (req,res)=>{
    try{
        const {month,year} = req.body;
        const employees = await Employee.find();
        for (const emp of employees){
            const PayrollData = await calculatePayroll(emp._id,month,year);
            const Payroll = new Payroll({
                employee:emp._id,
                month,
                year,
                grossSalary:PayrollData.gross,
                netSalary:PayrollData.net,
                deductions:PayrollData.deductions,
                bonuses:PayrollData.bonuses


            });
            await Payroll.save();
        }
        res.status(201).json({message: 'Payroll generated for all employees.'});

    } catch (err){
        res.status(500).json({error:err.message});
    }
};
export const getPayslip = async (req,res)=>{
    try{
        const {employeeId,month} = req.params;
        const Payroll = await Payroll.findOne({employee:employeeId,month});
    //     if (!Payroll) return res.status(404).json({message:'payslip not found'})
    //     const pdfBuffer = await pdfGeberator.generatePayslipPDF(payroll);
    // res.setHeader('Content-type','applicetion/pdf');
    // res.send(pdfBuffer);

    res.status(200).json({message: "PaySlip retrieved succesfully"})
} catch (err){
    res.status(500).json({error:err.message});
}
};

export const getPayrollHistory = async (req,res)=>{
    try {
        const {employeeId}=req.params;
        const history = await Payroll.find({employee:employeeId}).sort({year:-1,month:-1});
        res.status(200).json(history);
        } catch (err){
            res.status(500).json({error:err.message});
        }
};
export const addBonus = async (req,res)=>{
    try{
        const {employeeId} =req.params;
        const {month,amount,reason}=req.body;
        const Payroll = await Payroll.findOne({employee:employeeId,month});
        if(!Payroll) return res.status(404).json({message:'Payroll not found'});
        Payroll.bonuses.push({amount,reason});
        Payroll.netSalary += amount;
        await Payroll.save();
        res.status(200).json({message:'Bonus added.'});
    } catch (err){
        res.status(500).json({error:err.message});
    }
};
export const updatePayrollSettings = async (req,res)=>{
    try{
        const {settings} =req.body;
        res.status(200).json({message:'Settings updated',settings});
    } catch (err){
        res.status(500).json({error:err.message});
    }
};
export const getTaxReport = async (req,res)=>{
    try{
        const {year} =req.params;
        const report = await Payroll.aggregate([
            {$match: {year:parsetInt(year)}},
            {
                $group:{
                    _id:'$employee',
                    totalTax:{$sum:'$deductions.tax'},

                },
            },
        ]);
        res.status(200).json(report);
    }catch (err){
        res.status(500).json({error:err.message});
    }
};
export const getPayrollLogs = async (req,res)=>{
    try{
        res.status(200).json({logs:[]});
    } catch (err){
        res.status(500).json({error:err.message});
    }
};