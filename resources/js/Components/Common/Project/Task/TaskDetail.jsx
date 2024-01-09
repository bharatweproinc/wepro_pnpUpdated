import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Chip, Grid, Tooltip, Typography, Button } from '@mui/material';
import React from 'react'
import StatusStyle from '../Components/StatusStyle';
import FormatDate from "@/Util/FormatDate";
import DateTimeFormat from "@/Util/DateTimeFormat";
import StatusPopUp from './Components/StatusPopUp';
import { useState } from 'react';
import SuccessMsg from '../../SuccessMsg';
import PauseOrUpdateTime from '../Components/PauseOrUpdateTime';
import ReviewedPopup from './Components/ReviewedPopup';
import { useEffect } from 'react';

const TaskDetail = ({auth, data, developer,updated}) => {
    const dev_id = data.developer_id.split(",");
    const dev = dev_id.map((item,j) => Number(item));
    const role = auth.user.user_role;
    const [selectedStatus ,setSelectedStatus] = useState(null);
    const [state , setState] = useState({status:null});
    const [msg ,setMsg] = useState(null);
    const [severity ,setSeverity] = useState("success");
    function handleClick (status) {
      setSelectedStatus(status);
      setState({"status":status});
    }

    const handleClosePopup =() =>{
        setSelectedStatus(null);
    }
    const timeCalculate =(val)=>{
        if(val >59){
            const hours = Math.floor(val / 60);
            const minutes = val % 60;
            const second = 0;
           const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2,'0')}`;
        return formattedTime;
           }
        else{
            const hours = Math.floor(val / 60);
            const minutes = val ;
            const second = 0;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2,'0')}`;
        return formattedTime;
        }
    }

    function getAction(status){
        let btnJSX = '';
        switch(status){
            case 'new':
                btnJSX = (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px' }}>
                    <Button size="small" variant='contained' onClick={()=>handleClick('started')} sx={{borderRadius:'12px',backgroundColor:'#00bcd4'}}>Start</Button>
                    <Button sx={{ borderRadius:'12px'}} color="secondary" size="small" variant='contained' onClick={()=>handleClick("hold")}>Hold</Button>
                </div>:<>
                    <Button sx={{ borderRadius:'12px',backgroundColor:'#00bcd4' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                </>
                break;
            case 'in progress':
                btnJSX = (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px'  }}>
                    <Button
                        sx={{borderRadius:'12px',backgroundColor:'#757575'}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>
                    <Button sx={{ borderRadius:'12px',}}
                        size="small"
                        variant='contained'
                        color="secondary"
                        onClick={()=>handleClick("hold")}
                    >Hold</Button>
                </div>:<>
                    <Button sx={{ borderRadius:'12px',backgroundColor:'#757575' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>

                </>
                break;
            case 'pause':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px'  }}>
                    <Button sx={{ borderRadius:'12px', backgroundColor:'#00bcd4' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                    <Button sx={{ borderRadius:'12px',}}
                        size="small"
                        variant='contained'
                        color="secondary"
                        onClick={()=>handleClick("hold")}
                    >Hold</Button>
                </div>:<>
                    <Button sx={{ borderRadius:'12px', backgroundColor:'#00bcd4'}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                </>
                break;
                case 'started':
                btnJSX = (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px'  }}>
                    <Button size="small" variant='contained'  onClick={()=>handleClick('pause')} sx={{ borderRadius:'12px' ,backgroundColor:'#757575'}}>Pause</Button>
                    <Button sx={{ borderRadius:'12px' ,backgroundColor:'#2e7d32'}} size="small" variant='contained' onClick={()=>handleClick("complete")}>complete</Button>
                </div>:<div style={{ display:'flex',gap:'5px' }}>
                    <Button sx={{ borderRadius:'12px',backgroundColor:'#757575' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>
                   <Button sx={{ borderRadius:'12px',backgroundColor:'#2e7d32'}} size="small" variant='contained' onClick={()=>handleClick("complete")}>complete</Button>

                </div>
                break;
            case 'hold':
                btnJSX = (role == 'admin' || role == 'project manager') ? <>
                    <Button sx={{ borderRadius:'12px',backgroundColor:'#00bcd4' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                </>:<>
                    <Typography>Status is on Hold Now!</Typography>
                </>
                break;
            case 'complete':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px'  }}>
                    <Button sx={{borderRadius:'12px' ,backgroundColor:"#29b6f6" }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('reviewed')}
                    >Reviewed</Button>
                     <Button sx={{borderRadius:'12px' ,backgroundColor:'#8c9eff' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('debugging')}
                    >Debugging</Button>
                </div>:<>
                    <Typography>Task has been completed</Typography>
                </>
                break;
            case 'reviewed':
                btnJSX =  (role == 'admin' || role == 'project manager') ? <div style={{ display:'flex',gap:'5px'  }}>
                  <Button sx={{borderRadius:'12px' ,backgroundColor:'#2e7d32' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('complete')}
                    >Complete</Button>
                    <Button sx={{borderRadius:'12px' ,backgroundColor:'#8c9eff' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick('debugging')}
                    >Debugging</Button>
                </div>:<>
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
    const root = (role =="admin"? "admin.project.task.status" :role == "project manager"
    ?"projectManager.project.task.status" : (auth.user.user_role == "junior developer" || auth.user.user_role == "senior developer ")
    && "developer.project.task.status"
    );
    const pauseStatus =(item)=>{
        router.post(route(root,{id:updated[0].id}),item);
    }

    const handleSubmit =(e)=>{
        router.post(route(root, {id:data.id}),state,{
            onSuccess: ()=> {
                handleClosePopup();
                setState("");
                setMsg('Task Status updated successfully.')
                setSeverity('success');
            },onError:(error) => {
                setMsg(error.message)
                setSeverity('error');
            },
        })
    }
    return (
            <>
            {
                msg && <SuccessMsg severity={severity} error={msg} setError={setMsg} title={msg}/>
            }
                <Box sx={{ flexGrow: 10, background: "#f9f9f9", boxShadow: "2px 2px 2px 2px #e3e1da", padding: "5px",}}>
                    <Grid container >
                        <Grid item xs={12} style={{  background: "rgb(236 236 236)",  display: "flex",  justifyContent: "space-between", alignItems: "center", height: "50px", }}>
                            <Typography sx={{ fontWeight: "bold",paddingLeft:'20px' }}>Task Information </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} paddingLeft={'20px'}>

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
                            <Typography sx={{ fontWeight: "bold" }}> Estimate Time(Minutes)</Typography>
                            <Typography className="capitalize">{timeCalculate(data.estimated)}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Working Hour</Typography>
                            <Typography className="capitalize">{timeCalculate(data.development_hours)} Minutes</Typography>
                        </Grid>
                        {role !== 'hr manager' &&
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "bold" }}>Action</Typography>
                                {getAction(data.status)}
                                {   selectedStatus && ( <StatusPopUp role={role} buttonText={selectedStatus} status={data.status} taskId={data.id} onClose={handleClosePopup} handleSubmit={handleSubmit}/>)}
                                {
                                    selectedStatus && (state.status =="reviewed" || state.status =="debugging" )&&
                                    <ReviewedPopup Id={data.id} setSelectedStatus={setSelectedStatus} auth={auth} handleSubmit={handleSubmit} setState={setState} state={state}/>
                                }
                                {
                                    (auth.user.user_role =="junior developer" || auth.user.user_role =="junior developer") && selectedStatus && (state.status == "complete") &&
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
                { (auth.user.user_role !=="junior developer" || auth.user.user_role !=="junior developer") &&
                <Box
                    sx={{
                        flexGrow: 10,
                        marginTop: "2%",
                        background: "#f9f9f9",
                        boxShadow: "2px 2px 2px 2px #e3e1da",
                        padding: "5px",
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
                            <Typography sx={{ fontWeight: "bold", paddingLeft:'20px' }}> Developers</Typography>
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
                }
            </>
        )
}

export default TaskDetail;
