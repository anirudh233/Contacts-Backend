const {constants}=require("../constants")
const errorHandler=(err,req,res,next)=>
{
const statuscode=res.statusCode ? res.statusCode : 500
switch (res.statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"No input",message: err.message,stackTrace: err.stack})
    case constants.NOT_FOUND:
        res.json({title:"Not Found",message: err.message, stackTrace: err.stack})
        break;
case constants.UNAUTHORIZED:
    res.json({title: "Validation Failed", message: err.message,stackTrace: err.stack})
    break;
case constants.FORBIDDEN:
    res.json({title: "Forbidden error", message: err.message,stackTrace: err.stack})
    break;
case constants.INTERNAL_SERVER:
    res.json({title: "Internal server error", message: err.message,stackTrace: err.stack})
    break;
    default: 
        break;
}
next()
}
module.exports=errorHandler