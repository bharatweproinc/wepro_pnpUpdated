import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

import {
    Box,
    Button,
    DialogContentText,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

export default function StartTimerPopUp({auth,Id,statusSubmit , setIsEdit ,setState ,state}) {
    const [open, setOpen] = useState(true);
    const [start_time, setStart_time] = useState('');

    const handleClose = () =>{
        setStart_time('');
        setOpen(false);
        setIsEdit(false);
        setState(state);
    }
    const currentTime = new Date().toLocaleTimeString();
    const handleStartTimer = () =>{
        setStart_time(currentTime);
        setOpen(false);
        statusSubmit();
    }
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Start Timer</DialogTitle>
                    <Typography variant="h4" sx={{ display:'flex',alignItems:"center",justifyContent:"center",pt:"15px" }} >Are You Sure?</Typography>

                    <Box sx={{ padding:"10px 40px" }}>
                        <DialogContentText id="alert-dialog-description" sx={{ textAlign:"center" }}>
                            Do you really want to start this task?
                        </DialogContentText>
                    </Box>

                <DialogActions sx={{ display:'flex',justifyContent:'center',alignItems:"center" }}>
                    <Button color="error" variant="contained" onClick={handleClose} sx={{ cursor:"pointer" }} startIcon={<CloseIcon/>}> Cancle</Button>
                    <Button variant="contained" onClick={handleStartTimer} sx={{ cursor:"pointer" }} startIcon={<AlarmOnIcon/>}> Start</Button>
                   {/* <Typography sx={{ cursor:"pointer" }} onClick={handleStartTimer} >Start <AlarmOnIcon /></Typography> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
