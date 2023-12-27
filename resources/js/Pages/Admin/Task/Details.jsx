import FormatDate from "@/Util/FormatDate";
import { router, useForm } from "@inertiajs/react";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import DateTimeFormat from "@/Util/DateTimeFormat";
import { useState } from "react";
import StatusPopup from "../../../Components/Common/Project/Task/StatusPopup";
import CheckIcon from '@mui/icons-material/Check';
import Edit from "@/Components/Common/Project/Task/Edit";
import StatusStyle from "@/Components/Common/Project/Components/StatusStyle";

export default function Details({data ,developer}){

    const { item, setItem,get, post, processing, errors, reset } = useForm();
    const [state ,setState] = useState({
        status : data.status,
    });

    const [isEdit , setIsEdit] = useState(false);
    const handleUpdate = (id)=>{
        get(route('admin.project.task.edit',{id}));
    }

    const dev_id= (data.developer_id.split(','));
    const dev = dev_id.map((item)=>Number(item));

    const  handleStatus = () => {
         setIsEdit(true);
    }
    const handleChange = (e) =>{
        setState({'status':e.target.value});
    }

    const statusSubmit = () => {
        router.post(route('admin.project.task.status',{id:data.id}),state);
        setIsEdit(false);
    }

    return (
       <>
        <Box
            sx={{
                flexGrow: 10,
                margin: "2%",
                background: "#f9f9f9",
                boxShadow: "2px 2px 2px 2px #e3e1da",
                padding: "40px",
            }}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    style={{ background: "rgb(236 236 236)", display: "flex" ,justifyContent:"space-between"
                    ,alignItems:"center"}}
                >
            <Typography sx={{ fontWeight: "bold",marginLeft:"10px"}} >Task Information</Typography>

            <Edit devId={dev.id} developer={developer} data={data} sx={{display:'flex',justifyContent:"end"}}/>

            </Grid>
        </Grid>
        <br/>
       <Grid container >
            <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Task Name </Typography>
                <Typography className="capitalize">{data.task_name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Priority</Typography>
                <Typography>{data.priority}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Status</Typography>
            {
                isEdit ?
                <Box component={'form'} onSubmit = {statusSubmit}>
                   <Select
                        value={state.status}
                        name="status"
                        style={{
                            height: "42px",
                        }}
                        size="20px"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1  "
                        onChange={handleChange}
                        required>
                    <MenuItem value={"new"}>New</MenuItem>
                    <MenuItem value={"started"}>
                        Started
                    </MenuItem>
                    <MenuItem value={"complete"}>
                        Complete
                    </MenuItem>
                    <MenuItem value={"pause"}>
                        Pause
                    </MenuItem>
                </Select>
                <IconButton color="primary" aria-label="save">
                        <CheckIcon color="primary" sx={{fontSize:"30px" , fontWeight:"bold"}} onClick={statusSubmit}/>
                </IconButton>

                </Box> :
                 <div style={{ display:'flex' , alignItems:"center"}}>
                 <Typography className="capitalize"><Chip label={state.status}
                     style={{ background:StatusStyle.ChipColor[state.status].color,color:'white' }}
                     />
                 </Typography>
                 <IconButton color="primary" aria-label="edit">
                     <EditIcon onClick={handleStatus}/>
                 </IconButton>
             </div>
            }
            {
                state.status == 'Complete' && <StatusPopup/>
            }
            </Grid>
       </Grid>
       <br/>
       <Grid container >
       <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Level </Typography>
                <Typography>{data.level}</Typography>

            </Grid>
       <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Start Date </Typography>
                <Typography className="capitalize"><FormatDate date={data.start_date} /></Typography>

            </Grid>
            <Grid item xs={4}>
                <Typography sx={{fontWeight:"bold"}}>Created At </Typography>
                <Typography className="capitalize"><DateTimeFormat date={data.created_at} /></Typography>

            </Grid>

       </Grid>
       <br/>
       <Grid container >
       <Grid item xs={12}>
                <Typography sx={{fontWeight:"bold"}}>Description </Typography>
                <Typography className="capitalize">{data.description}</Typography>
            </Grid>

       </Grid>
       </Box>

    <Box
            sx={{
                flexGrow:10,
                margin: "2%",
                background: "#f9f9f9",
                boxShadow: "2px 2px 2px 2px #e3e1da",
                padding: "40px",
            }}
        >
        <Grid container>
            <Grid
                item
                xs={12}
                style={{
                    background: "rgb(236 236 236)",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "35px",
                }}
            >
                <Typography
                    sx={{ fontWeight: "bold", marginLeft: "10px" }}
                >
                    Developers
                </Typography>
            </Grid>
        </Grid>

        <br />
        <Box>
                    {
                       dev.map((dev_id) =>  (
                        developer.map((item, j) =>(
                           dev_id === item.id &&
                            (
                            <Chip label={item.name} className="capitalize" sx={{ margin:"10px"}}
                             color={item.user_role == "senior_developer" ? "primary" : "secondary"}/>

                           )
                        ))
                       ))
                           }
                    </Box>
    </Box>


       </>
    );
}
