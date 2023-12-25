const { default: Joi } = require("@/Util/JoiValidator");

const Leave_Schema ={
        description: Joi.string().required(),
        requested_date: Joi.string().required(),
        subject: Joi.string().required(),
        to_date: Joi.date().required(),
        days:Joi.string().required(),
        file:Joi.string().required(),
        user:Joi.string().required(),
}

const LeaveValidation ={
    Leave_Schema,
}
export default LeaveValidation;
