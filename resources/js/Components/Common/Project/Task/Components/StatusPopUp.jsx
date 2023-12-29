import * as React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from "lodash";
import SaveIcon from '@mui/icons-material/Save';
import Prefix from "@/Constant/APIPrefix";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

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

export default function StatusPopUp({buttonText='Open dialog',status, role, taskId}) {
    const [open, setOpen] = React.useState(false);
    const initState = {
        status: buttonText,
        description: "",
        task_file: [],
        eta: buttonText === 'debug' ? "" : undefined,
    }
    console.log(status,"status");
    const { data, setData, post, processing, errors, setError } = useForm(_.cloneDeep(initState))

    function handleFileChange(e){
        const files = e.target.files;
        setData("task_file",[...data.task_file, ...files]);
    }

    function handleDelete(index){
        const updatedFiles = [...data.task_file];
        updatedFiles.splice(index, 1);
        setData("task_file",updatedFiles);
    }

    function handleSubmit(){
                setOpen(false);

        // post(route(`${Prefix[role]}.task.update`, { id: taskId }),{
        //     onSuccess: ()=> {
        //         setData({
        //             task_file: [],
        //             description: "",
        //             eta: buttonText === 'debug' ? "" : undefined,
        //         });
        //         setMsg('Task Status updated successfully.')
        //         setOpen(false);
        //         setSeverity('success');
        //     },onError:(error) => {
        //         setMsg(error.message)
        //         setSeverity('error');
        //     },
        // });
    }

    return (
        <React.Fragment>
            <Button sx={{ borderRadius:'12px',
                marginLeft:'10px',
            }}
                variant="contained"
                size="small"
                onClick={() => {setOpen(true) }}
            >{buttonText}</Button>
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
                    <Button variant="contained" onClick={handleSubmit} sx={{ cursor:"pointer" }} startIcon={<AlarmOnIcon/>}> {initState.status}</Button>

                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
