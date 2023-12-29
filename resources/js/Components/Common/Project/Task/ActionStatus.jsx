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
import { Box, Grid, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@inertiajs/inertia-react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from "lodash";
import SaveIcon from '@mui/icons-material/Save';
import Prefix from "@/Constant/APIPrefix";

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

export default function ActionStatus({buttonText='Open dialog', role, taskId}) {
    const [open, setOpen] = React.useState(false);
    const initState = {
        status: buttonText,
        description: "",
        task_file: [],
        eta: buttonText === 'debug' ? "" : undefined,
    }
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
        post(route(`${Prefix[role]}.task.update`, { id: taskId }),{
            onSuccess: ()=> {
                setData({
                    task_file: [],
                    description: "",
                    eta: buttonText === 'debug' ? "" : undefined,
                });
                // setMsg('Task Status updated successfully.')
                setOpen(false);
                // setSeverity('success');
            },onError:(error) => {
                // setMsg(error.message)
                // setSeverity('error');
            },
        });
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
                <DialogContent dividers>
                    <Grid container spacing={2} padding={"10px 20px"}>
                        <Grid item xs={12}>
                            <Typography fontWeight={"bold"} variant="subtitle2">Description</Typography>
                            <TextareaAutosize
                                minRows={2}
                                value={data.description}
                                className="w-full block"
                                onChange={(e)=>setData("description",e.target.value)}
                            />
                        </Grid>

                        {buttonText === 'debug' && <Grid item xs={12}>
                            <Typography fontWeight={"bold"} variant="subtitle2">ETA</Typography>
                            <TextField value={data.eta} size="small" fullWidth type="number"
                                onChange={(e)=>setData("eta",e.target.value)}
                            />
                        </Grid>}

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" fontWeight={"bold"}>Images</Typography>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload file
                            <VisuallyHiddenInput type="file" multiple  onChange={handleFileChange} />
                            </Button>
                            <Grid container spacing={2} padding={"30px 20px"}>
                                {data.task_file.map((file, index) => (
                                    <Grid item xs={12} md={4} sm={6} key={index}>
                                        <Box style={{ position: "relative"}}>
                                            <a href={URL.createObjectURL(file)} target="_blank">
                                                <img src={URL.createObjectURL(file)}
                                                    alt={`selected-${index}`}/>
                                            </a>
                                            <Button style={{ position:"absolute",
                                                top: 0, right: 0,
                                                background:"transparent"}}
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <DeleteIcon color="error" />
                                            </Button>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="contained" color="error" startIcon={<CloseIcon/>}>Cancle</Button>
                    <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon/>}>Upload</Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
