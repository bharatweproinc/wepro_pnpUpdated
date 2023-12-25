import Joi from "@/Util/JoiValidator";

const USER_SCHEMA = {
    name:Joi.string().max(20).required(),
    email:Joi.string().required().email(),
    contact_no:Joi.string().required(),
    user_role:Joi.string().valid('admin').valid('hr manager').valid('project manager').valid('junior developer').valid('senior developer'),
    password:Joi.string().required(),
    password_confirmation:Joi.string().required(),
    // password_confirmation:Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
};

const ValdidationSchema = {
    USER_SCHEMA
}

export default ValdidationSchema;
