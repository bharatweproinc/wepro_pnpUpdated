import Joi from "@/Util/JoiValidator";

const USER_SCHEMA = {
    name:Joi.string().max(20).required(),
    email:Joi.string().required().email(),
    contact_no:Joi.string().required(),
    user_role:Joi.string().valid('admin').valid('hr manager').valid('project manager').valid('junior developer').valid('senior developer'),
    password:Joi.string().required(),
    // password_confirmation:Joi.string().required().oneOf([ref('password')], 'Passwords must match'),
};

const ValdidationSchema = {
    USER_SCHEMA
}

export default ValdidationSchema;
