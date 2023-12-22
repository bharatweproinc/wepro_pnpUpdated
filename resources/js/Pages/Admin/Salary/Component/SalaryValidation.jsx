import Joi from "@/Util/JoiValidator";

const Salary_Schema ={
    basic_salary:Joi.number().integer().required().max(6),
    house_rent: Joi.number().integer().required().max(6),
    leave_allowance: Joi.number().integer().required().max(6),
    medical_conveyance: Joi.number().integer().required().max(6),
    statutory_bonus: Joi.number().integer().required().max(6),
    tax_deducted: Joi.number().integer().required(),
    provided_fund: Joi.number().integer().required().max(6),
    gross_salary: Joi.number().integer().required(),
    net_salary: Joi.number().integer().required(),
}

const SalaryValidation ={
    Salary_Schema,
}
export default SalaryValidation;
