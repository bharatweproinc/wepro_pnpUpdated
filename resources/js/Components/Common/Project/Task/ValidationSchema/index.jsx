import  Joi  from "joi-browser";
let start_date =''
let end_date = ''
const APPLY_FILTER = {
    // status : Joi.string().label('Status'),
    // developer_id: Joi.string().label('Type'),
    // from_date: Joi.string().label('From Date').required().trim(""),
    to_date: Joi.string().label('To Date').required().trim("")

}



const Validation_Schema = {
    APPLY_FILTER,
}
export default Validation_Schema;
