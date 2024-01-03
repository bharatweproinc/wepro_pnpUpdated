import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, DialogContentText, Grid, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";
import _ from "lodash";
import SaveIcon from '@mui/icons-material/Save';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function StatusPopUp({role, buttonText, status, taskId, onClose ,handleSubmit}) {
    const [open, setOpen] = useState(true);
    const initState = {
        status: buttonText,
        description: "",
        task_file: [],
        eta: buttonText === 'debug' ? "" : undefined,
    }

    const handleStatus=(e)=>{
        handleSubmit();
    }

    return (
        <React.Fragment>
            {/* <Button sx={{ borderRadius:'12px',
                marginLeft:'10px',
            }}
                variant="contained"
                size="small"
                onClick={() => {setOpen(true) }}
            >{buttonText}</Button> */}
            <BootstrapDialog
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Task {buttonText}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{ position: "absolute",
                        right: 8, top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ padding:"10px 20px" }}>
                        <DialogContentText id="alert-dialog-description" sx={{ textAlign:"center" }}>
                            Do you really want to {initState.status} this task?
                        </DialogContentText>
                    </Box>


                <DialogActions>
                    <Button color="error" variant="contained" onClick={() => setOpen(false)}  sx={{ cursor:"pointer" }} startIcon={<CloseIcon/>}> Cancle</Button>
                    <Button variant="contained" onClick={()=>handleStatus()} sx={{ cursor:"pointer" }} startIcon={<AlarmOnIcon/>}> {initState.status}</Button>

                </DialogActions>

            </BootstrapDialog>
        </React.Fragment>
    );
}
