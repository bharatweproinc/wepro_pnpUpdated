import Joi from "@/Util/JoiValidator";

const Salary_Schema ={
    basic_salary:Joi.number().integer().required().min(100).max(999999),
    house_rent: Joi.number().integer().required().min(100).max(999999),
    leave_allowance: Joi.number().integer().required().min(100).max(999999),
    medical_conveyance: Joi.number().integer().required().min(100).max(999999),
    statutory_bonus: Joi.number().integer().required().min(100).max(999999),
    tax_deducted: Joi.number().integer().required().min(1).max(100),
    provided_fund: Joi.number().integer().required().min(100).max(999999),
    gross_salary: Joi.number().integer().required(),
    net_salary: Joi.number().integer().required(),
}

const SalaryValidation ={
    Salary_Schema,
}
export default SalaryValidation;
