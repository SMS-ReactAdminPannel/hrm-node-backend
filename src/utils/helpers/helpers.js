import { v4 as uuid, v4 } from "uuid"
import Otp from "otp-generator"
import nodemailer from "nodemailer"
import fs from "fs"
import crypto from "crypto"
import jwt from "jsonwebtoken"


export const generateUUID = async () => {
    const genUUID = v4()
    return genUUID
}

export const generateOtp = async () => {
    const otp = Otp.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    const token = crypto.randomBytes(5).toString('hex')
    return { otp, token };
}

export const generateRandomSecretKey = () => {
    const secret_key = crypto.randomBytes(32).toString('hex')
    return secret_key
}

export const generateToken = (user) => {
    const token = jwt.sign({ email: user.email, role: user.role, uuid: user.uuid, user_type: "platform" }, process.env.secret_key, { expiresIn: "24h" }, { algorithm: 'RS256' })
    return token
}

export const generateInstituteToken = (user) => {
    const token = jwt.sign({ email: user.email, role: user.role, institute_id: user.institute_id, uuid: user.uuid, user_type: "institute" }, process.env.secret_key, { expiresIn: "24h" })
    return token
}

export const generateRandomPassword = (length = 12) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:<>?";
    
    const allChars = uppercase + lowercase + numbers + specialChars;
  
    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Shuffle password for randomness
  };
  

export const decodeToken = (token) => {
    try {
        const decode = jwt.verify(token, process.env.secret_key)
        return decode
    } catch (error) {
        if (error.message === "jwt expired") {
            return { status: "failed", message: error.message }
        }
        return { status: "failed", message: error.message, data: null }
    }

}

export const FilterQuery = (query, defaultQuery) => {
    const filteredQuery = {}

    Object.keys(defaultQuery).forEach(key => {
        if (query.hasOwnProperty(key)) {
            filteredQuery[key] = query[key]
        }
    })
    return filteredQuery
}

export const SplitArrayIds = ({ data, key }) => {
    if (Array.isArray(data)) {
        const Ids = data?.map((item) => item[key])
        return Ids
    } else {
        return "unsupport data format"
    }
}

export const filterPermissionsByActions = (permissions, actions) => {
    return permissions.filter(permission => actions.some(action => permission[action] === true))
}


export const getEmailServiceProvider = (email) => {
    try {
    const domain = email.split("@")[1]
    if(domain.includes('gmail.com')){
       return "Gmail";
    }else if (domain.includes('outlook.com') || domain.includes('hotmail.com') || domain.includes('live.com')) {
        return 'Outlook';
    } else if (domain.includes('yahoo.com')) {
        return 'Yahoo';
    } else {
        return domain
    }
    } catch (error) {
        console.log("domain ",error)
    } 
}

export const createTransport = (emailService, email, password) => {
    let transport;

    if(emailService==="Gmail"){
       transport = nodemailer.createTransport({
        service : "gmail",
        secure:false,
        auth: {
            user : email,
            pass : password
        },
        tls: {
            rejectUnauthorized: false
          }
       });
    }else if(emailService === "outlook"){
        transport = nodemailer.createTransport({
            host : 'smtp.office365.com',
            port : 587,
            secure : true,
            auth : {
                user : email,
                pass : password
            }
        })
    }else{
        transport = nodemailer.createTransport({
            
            service : "gmail",
            secure:false,
            auth: {
                user : email ,
                pass : password
                
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } 
    return transport
}

export const emailChecker=(email,mailOption)=>{
  emailext.check(email, (error, exists) => {
        if (error) {
            console.error("Verification failed:", error);
        } else {
            console.log("Email exists:", exists);
            if (!exists) {
            MockEmailData.push({
            id:1,
            from:process.env.sender_mail,
            to:email,
            subject:mailOption.subject,
            html:mailOption.html})
            }
        }
        });
}

export const sentOtpEmail=async(receiver,otp) => {
      fs.readFile("src/templates/Autentication/otp_template.html",'utf8',(error,data) => {
         if(error){
            console.log("Error:", error);
            
            return;
         }
         console.log(receiver,otp)
         const date = new Date().toLocaleDateString()
         const htm1 = data.replace('{{date}}',date)
         const html =htm1.replace('{{OTP}}',otp)

        const mailOptions = {
            from: process.env.sender_mail,
            to: receiver,
            subject: "OTP Verification",
            html: html
        }
        // emailChecker(receiver,mailOptions)
        const mailService = getEmailServiceProvider(receiver)
        const transport = createTransport(mailService, process.env.sender_mail, process.env.sender_password)

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending OTP email:', error)
            }
            console.log('OTP email sent:', info.response);
        })
    })
}

export const sendTemproaryPasswordEmail = async(receiver,tempPassword) => {
    console.log(receiver,tempPassword)
    const mailOptions={
        from:process.env.sender_mail,
        to:receiver,
        subject:"Your Temporary Password",
        html:`<p>Your temporary password is: <strong>${tempPassword}</strong>. Please reset it after login.</p>`
    }
    const mailService = getEmailServiceProvider(receiver)
    const transport = createTransport(mailService,process.env.sender_mail,process.env.sender_password)

    transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.error('Error sending Reset Password email:', error)
        }
        console.log('Temproary Password sent your email:', info.response);
    })
}

export const sendSuccessEmail = async(receiver) => {
    fs.readFile("src/templates/mail_template.html", 'utf8', (error, data) => {
        if (error) {
            return;
        }
        const date = new Date().toLocaleDateString()
        const html = data.replace('{{date}}', date)

        const mailOptions = {
            from: process.env.sender_mail,
            to: receiver,
            subject: "DashBoard Created Successfully",
            html: html
        }
        const mailService = getEmailServiceProvider(receiver)
        const transport = createTransport(mailService, process.env.sender_mail, process.env.sender_password)

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending success email:', error)
            }
            console.log('Success email sent:', info.response);
        })
    })
}