import React from 'react'
import { router } from '@inertiajs/react';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Chip, Grid, Tooltip, Typography, Button, Alert } from '@mui/material';
import StatusStyle from '../Components/StatusStyle';
import ActionStatus from './ActionStatus';
import StatusPopUp from './Components/StatusPopUp';
import { useState } from 'react';
import SuccessMsg from '../../SuccessMsg';
import PauseOrUpdateTime from '../Components/PauseOrUpdateTime';
import ReviewedPopup from './Components/ReviewedPopup';
import { useEffect } from 'react';

const TaskBugs = ({bugs,auth, data,updated}) => {
    const dev_id = data.developer_id.split(",");
    const dev = dev_id.map((item,j) => Number(item));
    let role = auth.user.user_role;

    const [selectedStatus ,setSelectedStatus] = useState(null);
    const [state , setState] = useState({status:null});
    const [msg ,setMsg] = useState(null);
    const pauseStatus = "pause";
    const [severity ,setSeverity] = useState("success");
    let text_cases = "";
    let title ="";
    function handleClick (status) {
      setSelectedStatus(status);
      setState({"status":status});
    }

    function handleClosePopup() {
        setSelectedStatus(null);
    }
    bugs.map((bug)=>(
             text_cases= bug.text_cases,
             title = bug.title
        ))
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
                btnJSX= <Button sx={{ borderRadius:'12px',  marginLeft:'10px', backgroundColor:'#00bcd4'}}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                break;
            case 'in progress':
                btnJSX= <Button sx={{ borderRadius:'12px',marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>

                break;
            case 'pause':
                btnJSX=   <Button sx={{ borderRadius:'12px', marginLeft:'10px', }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                break;
                case 'started':
                    btnJSX= <>
                    <Button sx={{ borderRadius:'12px',  marginLeft:'10px',backgroundColor:'#9c27b0' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("pause")}
                    >Pause</Button>
                   <Button sx={{ borderRadius:'12px',marginLeft:'10px',}} size="small" variant='contained' onClick={()=>handleClick("complete")}>complete</Button>

                </>
                break;
            case 'hold':
                    <Typography>Status is on Hold Now!</Typography>
                break;
            case 'complete':
                    <Typography>Task has been completed</Typography>
                break;
            case 'reviewed':
                    <Typography>Task has been reviewed</Typography>
                break;
            case 'debugging':
                btnJSX=  <Button sx={{ borderRadius:'12px', marginLeft:'10px',backgroundColor:'#8c9eff' }}
                        size="small"
                        variant='contained'
                        onClick={()=>handleClick("started")}
                    >Start</Button>
                break;
        }
        return btnJSX
    }
    const handleSubmit =(e)=>{
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

    return (

            <>
            {
                msg && <SuccessMsg severity={severity} error={msg} setError={setMsg} title={msg}/>
            }
            {bugs.length > 0 ?
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
                        <Grid item xs={12}
                            style={{
                                background: "rgb(236 236 236)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: "50px",
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>Bugs Information </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Task Name </Typography>
                            <Typography className="capitalize"> {data.task_name}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: "bold" }}>Title</Typography>
                            <Typography className="capitalize">{title} </Typography>
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
                            <Typography sx={{ fontWeight: "bold" }}> Estimate Time</Typography>
                            <Typography className="capitalize">{timeCalculate(data.estimated)}</Typography>
                        </Grid>
                        {auth.user.user_role !== 'hr manager' &&
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "bold" }}>Action</Typography>
                                {getAction(data.status)}
                                { selectedStatus && (
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
                            <Typography sx={{ fontWeight: "bold" }}>Text Cases</Typography>
                            <Typography className="capitalize">{text_cases} </Typography>
                        </Grid>

                    </Grid>
                </Box>
                { (auth.user.user_role !=="junior developer" || auth.user.user_role !=="junior developer") &&
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
                            <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}> Images</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid conatiner spacing={2} sx={{ display:'flex' ,justifyContent:'space-evenly' }}>
                        {bugs.map((item, j) =>
                        (
                            <Grid item xs={5} sx={{ padding:'10px' }}>
                                <a href={item.url} target='_blank' key={j}>
                                    <img src={item.url} sx={{cover:"100%" }} alt="not found"/>
                                </a>
                            </Grid>
                           )

                        )}
                    </Grid>
                </Box>
                }
            </> :
            <Alert severity='info'> No Bugs Founds .</Alert>
            }

            </>
        )

}

export default TaskBugs;
