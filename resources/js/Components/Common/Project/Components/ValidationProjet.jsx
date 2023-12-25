import Joi from "@/Util/JoiValidator";

const Project_Schema ={
        title: Joi.string().required(),
        description: Joi.string().required(),
        start_date: Joi.date().required(),
        project_manager: Joi.string().required(),
        developer: Joi.required(),
}
 const ValidationProject ={
    Project_Schema,
 }
 export default ValidationProject;
