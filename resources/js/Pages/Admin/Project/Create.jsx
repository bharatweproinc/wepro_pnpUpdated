import { useState } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Chip,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import SuccessMsg from "@/Components/Common/SuccessMsg";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
    height:'90%',
    display:'block',
};

export default function Create({developer, manager }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [alert,setAlert] = useState(false);
    const [severity,setSeverity]= useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_date: "",
        project_manager: "",
        developer: [],
    });
    const allDeveloper = developer.concat(manager);
    const handleDeveloper = (id) => {
        setData((prev) => ({
            ...prev,
            developer: prev.developer
                ? prev.developer.includes(id)
                    ? prev.developer.filter((value) => value !== id)
                    : [...prev.developer, id]
                : [id],
        }));
    };

    const handleClose = () => {
        setOpen(false);
        setData({});
    }

    useEffect(()=>{
        setData({
            title: "",
            description: "",
            start_date: "",
            project_manager: "",
            developer: [],
        })
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.project.save"),{
            onSuccess: ( )=> {
                setAlert("Project created Successfully");
                setSeverity('success');
                setData({});
                setOpen(false);
            },onError:(error) => {
                setAlert(error.error);
                setSeverity('error');
            },
        });
    };
    return (
        <div>
            {
                alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert}/>
            }
            <Button
                variant="contained"
                onClick={handleOpen}
                size="small"
                startIcon={<AddIcon />}
            >
                Create
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ width: "800px" }}>
                        <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >
                        <div style={{alignItems: "center",display: "flex",justifyContent: "center",paddingBottom:"10px"}}>
                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "30px",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: "bold" }}
                                >
                                    Create Project
                                </Typography>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    name="Title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    rows={3}
                                    value={data.description}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="manager"
                                    value="Select Manager"
                                />

                                {manager.length == 0 ? (
                                    <Alert severity="info">
                                        Don't have project Manager
                                    </Alert>
                                ) : (
                                    <select
                                        value={data.project_manager}
                                        name="project_manager"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        onChange={(e) =>setData("project_manager",e.target.value)}
                                        required
                                    >
                                        <option>Select Manager</option>

                                        {manager.map((mngr, index) => {
                                            return (
                                                <option
                                                    value={mngr.name}
                                                    key={index}
                                                >
                                                    {mngr.name} ({mngr.email})
                                                </option>
                                            );
                                        })}
                                    </select>
                                )}
                                <InputError
                                    message={errors.project_manager}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="Assign Date"
                                    value="Assign Date"
                                />

                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    autoComplete="start_date"
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.start_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="Assign to"
                                > Assign To - Project Manager <Chip label="PM" color="success" size="small" style={{ fontSize:'10px' }}/> &emsp; Developer <Chip label="D" size="small" style={{ fontSize:'10px' ,background:'gray',color:'white' }}/> </InputLabel>

                                <Grid item xs={12}>
                                    { allDeveloper.length == 0 ?
                                        <Alert severity="info">
                                            Don't Have Any Developer
                                        </Alert>
                                     :
                                            allDeveloper.map((user, index) => (
                                                    <Button
                                                        key={index}
                                                        variant={data.developer?.includes(user.id) ? "contained" : "outlined"}
                                                        size="small"
                                                        onClick={()=>handleDeveloper(user.id)}
                                                        style={{ margin: "2px" }}
                                                        endIcon={<Chip style={{ fontSize:'10px' }} label={user.user_role =="project manager" ? "PM" : "D"} color={user.user_role =="project manager" ?"success" : "primary" } sx={user.user_role !=="project manager" && { background:'gray'  }} size="small"/>}
                                                    >
                                                        {user.name}
                                                    </Button>
                                            ))

                                    }
                                </Grid>

                                <InputError
                                    message={errors.developer}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-center m-8">
                            <Button onClick={handleClose} variant="contained" color="error"
                                    style={{ height: "33px", marginLeft:"10px",fontSize:'10px',letterSpacing:'2px',fontWeight:'bold'
                                    }} startIcon={<CloseIcon sx={{ height:'15px',alignItems:'center',fontWeight:'bold' }}/>}
                                    >Cancle</Button>
                                <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }} >
                                    Create<SaveIcon sx={{ height:'15px',marginLeft:'8px' }}/>
                                </PrimaryButton>

                            </div>
                        </form>
                        </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
