exports.authorization = async(req,res,role) => {
    
        if (!role.includes(req.user.role === role)) {
            return res.render("error/unauthorized", {title: "Access denied"})
        
    }
};