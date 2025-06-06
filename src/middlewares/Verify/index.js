export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(500).json({ status: "failed", message: "Authentication credentials not provided" });
        }
        
        if (!(token.split(" ").includes("Token"))) {
            return res.status(500).json({ status: "failed", message: "token not validated format" });
        }
        
        if (!token) {
            return res.status(401).json({ status: "failed", message: "no authentication token provided", data: null });
        }

        const decoded = decodeToken(String(token?.split(" ").slice(-1)));
        
        if (decoded.status === "failed" && decoded.message === "jwt expired") {
            return res.status(401).json({ status: "failed", message: "Your session has expired. Please log in again", status: "session_expired" });
        }else if(decoded.status === "failed" ){
            res.status(401).json({ status: "failed", message: decoded.message})
        } 
        req.data = decoded;
        next();
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message, data: null });
    }
};
