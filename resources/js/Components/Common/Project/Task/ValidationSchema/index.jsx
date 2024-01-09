import  Joi  from "joi-browser";

const APPLY_FILTER = {
    // status : Joi.string().label('Status'),
    // developer_id: Joi.string().label('Type'),
    from_date: Joi.string().label('From Date').trim(""),
    to_date: Joi.when('from_date', {
        is: Joi.exist(),
        then: Joi.string().label('To Date').trim().required(),
        otherwise: Joi.string().label('To Date').trim()}),
}

const TaskSchema ={
    task_name: Joi.string().required(),
    description:Joi.string().required(),
    start_date: Joi.required(),
    priority: Joi.number().integer().required(),
    developer: Joi.string().required(),
    level: Joi.number().integer().required(),
    estimated:Joi.number().integer().required().min(1),
}

const Validation_Schema = {
    APPLY_FILTER,
    TaskSchema,
}
export default Validation_Schema;
