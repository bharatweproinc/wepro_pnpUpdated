import Joi from "@/Util/JoiValidator";

const USER_SCHEMA = {
    name:Joi.string().max(20).required(),
    email:Joi.string().required().email(),
    contact_no:Joi.string().required(),
    user_role:Joi.string().valid('admin').valid('hr manager').valid('project manager').valid('junior developer').valid('senior developer'),
    password:Joi.string().required(),
    password_confirmation:Joi.string().required(),
    dob:Joi.string().required(),
    gender:Joi.required(),
    alt_phone_no:Joi.string().required(),
    // password_confirmation:Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
};
const Address_Schema = {
    residential_address:Joi.string().required(),
    local_address:Joi.string().required(),
    state:Joi.string().required(),
    city:Joi.string().required(),
    pin_code:Joi.string().required(),
}

const ValdidationSchema = {
    USER_SCHEMA,
    Address_Schema
}

export default ValdidationSchema;
