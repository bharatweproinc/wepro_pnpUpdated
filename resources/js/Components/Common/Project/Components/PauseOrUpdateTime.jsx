import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import {
    Box,
    Button,
    DialogContentText,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

export default function PauseOrUpdateTime({auth,handleSubmit ,updated, setState ,setSelectedStatus, state}) {
    const [open, setOpen] = useState(true);
    const [item,setItem] = useState({ status : 'pause'});
    const handleClose = () =>{
        setOpen(false);
        setSelectedStatus(null);
        setState(state);
    }

    const handlePauseTimer = (e) =>{
        setOpen(false);
        // pauseStatus(item);
    }
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Task Status Warning</DialogTitle>
                    <Typography variant="h6" sx={{ display:'flex',alignItems:"center",justifyContent:"center",pt:"15px",fontWeight:"bold" }} >One Task is Already Start</Typography>
                    <Grid container sx={{ display:'flex',padding:'10px 50px',justifyContent:"center"}}>
                        <Grid container>
                            <Grid item xs="6">Task Id</Grid>
                            <Grid item xs="6"> {updated[0].id}</Grid>
                       </Grid>
                       <Grid container>
                            <Grid item xs="6">Task Name</Grid>
                            <Grid item xs="6">{updated[0].task_name}</Grid>
                       </Grid>
                       <Grid container>
                            <Grid item xs="6">Start Time of Task</Grid>
                            <Grid item xs="6">{updated[0].started_at}</Grid>
                       </Grid>

                    </Grid>
                   <Typography variant="h6" sx={{ pl:'16px' , display:'flex', justifyContent:"center"}}> Do you want to Pause Task :"
                    {updated[0].task_name} (task id :{updated[0].id}) "</Typography>


                <DialogActions sx={{ display:'flex',justifyContent:'center',alignItems:"center" }}>
                    <Button variant="contained" color="error" startIcon={<CloseIcon/>} onClick={handleClose} sx={{ cursor:"pointer" }}>cancle </Button>
                    <Button variant="contained" color="primary" startIcon={<PauseIcon />} onClick={handlePauseTimer} sx={{ cursor:"pointer" }}>Pause </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
