import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Chip, Grid, Tooltip, Typography, Button } from '@mui/material';
import React from 'react'
import StatusStyle from '../Components/StatusStyle';
import FormatDate from "@/Util/FormatDate";
import DateTimeFormat from "@/Util/DateTimeFormat";
import ActionStatus from './ActionStatus';
import StatusPopUp from './Components/StatusPopUp';
import { useState } from 'react';
import SuccessMsg from '../../SuccessMsg';
import PauseOrUpdateTime from '../Components/PauseOrUpdateTime';
import ReviewedPopup from './Components/ReviewedPopup';

const TaskDetail = ({auth, data, developer,updated}) => {
    const dev_id = data.developer_id.split(",");
    const dev = dev_id.map((item,j) => Number(item));
    let role = auth.user.user_role;

    const [selectedStatus ,setSelectedStatus] = useState(null);
    const [state , setState] = useState({status:null});
    const [msg ,setMsg] = useState(null);
    const pauseStatus = "pause";
    const [severity ,setSeverity] = useState("success");
    function handleClick (status) {
      setSelectedStatus(status);
      setState({"status":status});
    }

    function handleClosePopup() {
        setSelectedStatus(null);
    }
    function getAction(status){
        let btnJSX = '';
        switch(status){
            case 'new':
                btnJSX = (role == 'admin' || role == 'project manager') ? <>
                    <Button size="small" variant='contained' onClick={()=>handleClick('started')} sx={{borderRadius:'12px',marginLeft:'10px',}}>Started</Button>
                    <Button sx={{ borderRadius:'12px',marginLeft:'10px',}} size="small" variant='contained' onClick={()=>handleClick("hold")}>Hold</Button>
                </>:<>
                    <Button sx={{ borderRadius:'12px',  marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Started</Button>
                </>
                break;
            case 'in progress':
                btnJSX = (role == 'admin' || role == 'project manager') ? <>
                    <Button
                        sx={{borderRadius:'12px',marginLeft:'10px',}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>
                    <Button sx={{ borderRadius:'12px', marginLeft:'10px',}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("hold")}
                    >Hold</Button>
                </>:<>
                    <Button sx={{ borderRadius:'12px',marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>

                </>
                break;
            case 'pause':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <>
                    <Button sx={{ borderRadius:'12px', marginLeft:'10px',  }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Started</Button>
                    <Button sx={{ borderRadius:'12px', marginLeft:'10px',}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("hold")}
                    >Hold</Button>
                </>:<>
                    <Button sx={{ borderRadius:'12px', marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Started</Button>
                    <ActionStatus role={role} buttonText={'completed'} taskId={data.id} />
                </>
                break;
                case 'started':
                btnJSX = (role == 'admin' || role == 'project manager') ? <>
                    <Button size="small" variant='contained' onClick={()=>handleClick('pause')}>Pause</Button>
                    <Button sx={{ borderRadius:'12px',marginLeft:'10px',}} size="small" variant='contained' onClick={()=>handleClick("complete")}>complete</Button>
                </>:<>
                    <Button sx={{ borderRadius:'12px',  marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>
                   <Button sx={{ borderRadius:'12px',marginLeft:'10px',}} size="small" variant='contained' onClick={()=>handleClick("complete")}>complete</Button>

                </>
                break;
            case 'hold':
                btnJSX = (role == 'admin' || role == 'project manager') ? <>
                    <Button sx={{ borderRadius:'12px', marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Started</Button>
                </>:<>
                    <Typography>Status is on Hold Now!</Typography>
                </>
                break;
            case 'complete':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <>
                    <Button sx={{borderRadius:'12px',marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('reviewed')}
                    >Reviewed</Button>
                     <Button sx={{borderRadius:'12px',marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('debugging')}
                    >Debugging</Button>
                    {/* <ActionStatus role={role} buttonText={'debug'} taskId={data.id} /> */}
                </>:<>
                    <Typography>Task has been completed</Typography>
                </>
                break;
            case 'reviewed':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <>
                    <Typography>Task has been reviewed</Typography>
                </>:<>
                    <Typography>Task has been reviewed</Typography>
                </>
                break;
            case 'debugging':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <>
                    <Typography>Task has been Debugging</Typography>
                </>:<>
                    <Typography>Task has been Debugging</Typography>
                </>
                break;
        }
        return btnJSX
    }
    const handleSubmit =(e)=>{
        console.log(state,'status');
        { auth.user.user_role =="admin"?
        router.post(route("admin.project.task.status", {id:data.id}),state,{
            onSuccess: ()=> {
                handleClosePopup();
                setState("");
                setMsg('Task Status updated successfully.')
                setSeverity('success');
            },onError:(error) => {
                setMsg(error.message)
                setSeverity('error');
            },
        }) : auth.user.user_role == "project manager" ?
        router.post(route("projectManager.project.task.status", {id:data.id}),state,{
            onSuccess: ()=> {
                setMsg('Task Status updated successfully.')
                handleClosePopup();
                setState("");
                setSeverity('success');
            },onError:(error) => {
                setMsg(error.message)
                setSeverity('error');
            },}) :
            auth.user.user_role == "junior developer" || role == "senior developer " &&
            router.post(route("developer.project.task.status", {id:data.id}),state,{
                onSuccess: ()=> {
                    setMsg('Task Status updated successfully.')
                    setState("");
                    handleClosePopup();
                    setSeverity('success');
                },onError:(error) => {
                    setMsg(error.message)
                    setSeverity('error');
                },})
    }
    }
    return (
            <>
            {
                msg && <SuccessMsg severity={severity} error={msg} setError={setMsg} title={msg}/>
            }
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
                            style={{
                                background: "rgb(236 236 236)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: "50px",
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>Task Information </Typography>
                            {auth.user.user_role !== "hr manager" ||
                                auth.user.user_role !== "junior developer" ||
                                (auth.user.user_role !== "senior developer" && (
                                    <Edit
                                        devId={dev.id}
                                        developer={developer}
                                        data={data}
                                        auth={auth}
                                        sx={{ display: "flex",justifyContent: "end", }}
                                    />
                                ))}
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}> Task Name </Typography>
                            <Typography className="capitalize"> {data.task_name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}> Level</Typography>
                            <Typography>{data.level}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
                            <Box style={{display: "flex",alignItems: "center",}}>
                                <Typography className="capitalize">
                                    <Chip label={data.status} style={{background:StatusStyle.ChipColor[data.status ].color,color: "white",}}/>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Assign Date</Typography>
                            <Typography className="capitalize"><FormatDate date={data.start_date} /></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Created At</Typography>
                            <Typography className="capitalize"><DateTimeFormat date={data.created_at} /> </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Start Date</Typography>
                            <Typography className="capitalize">{data.started_at && <FormatDate date={data.started_at} />}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Working Hour</Typography>
                            <Typography className="capitalize">{data.hour_worked} Minutes</Typography>
                        </Grid>
                        {role !== 'hr manager' &&
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "bold" }}>Action</Typography>
                                {getAction(data.status)}
                                {   selectedStatus && (
                                <StatusPopUp
                                 role={role}
                                 buttonText={selectedStatus}
                                 status={data.status}
                                 taskId={data.id}
                                 onClose={handleClosePopup}
                                 handleSubmit={handleSubmit}
                                />
                                )}
                                {
                                    selectedStatus && (state.status =="reviewed" || state.status =="debugging" )&&
                                    <ReviewedPopup Id={data.id} setSelectedStatus={setSelectedStatus} auth={auth} handleSubmit={handleSubmit} setState={setState} state={state}/>
                                }
                                 {selectedStatus && state.status === 'started' && updated .length > 0 && (
                                data.id === updated[0].id ? <Alert>This task is Already start </Alert> :
                            <PauseOrUpdateTime
                                auth={auth}
                                pauseStatus={pauseStatus}
                                updated= {updated}
                                setState = {setState}
                                setSelectedStatus = {setSelectedStatus}
                                state={{ status:data.status }}
                            />
                        )}
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                            <Typography className="capitalize">{data.description} </Typography>
                        </Grid>
                    </Grid>
                </Box>
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
                        <Grid item xs={12}
                            style={{
                                background: "rgb(236 236 236)",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between",
                                height: "50px",
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}> Developers</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Box>
                        {developer.map(
                            (item, j) => {
                                return (
                                    dev.map((id_dev,i)=>{
                                        return (
                                            id_dev == item.id &&
                                            <Tooltip title={item.user_role}>
                                                <Chip label={item.name} key={j} className="capitalize" sx={{ margin:"10px"}}
                                                    color={item.user_role == "project manager" ? "success" : "primary"}/>
                                            </Tooltip>
                                        );
                                    })
                                );
                            }
                        )}
                    </Box>
                </Box>
            </>
        )
}

export default TaskDetail;
