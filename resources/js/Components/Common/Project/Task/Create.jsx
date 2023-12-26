import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Alert, Chip, Grid, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import SuccessMsg from "../../SuccessMsg";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    overflow:'scroll',
    height:'90%',
    display:'block',
};

export default function Create({ developer, Id ,auth }) {

    const [open, setOpen] = useState(false);
    const [msg,setMsg] = useState(false);
    const [severity ,setSeverity] = useState(null);
    const handleOpen = () => setOpen(true);
    const priority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { data, setData, post, processing, errors, reset } = useForm({
        task_name: "",
        description: "",
        start_date: "",
        priority: "",
        developer: [],
        level: "",
    });

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

    const handleClose = () =>{
        setOpen(false);
        setData({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        {
            auth.user.user_role == "admin" ?
           post(route("admin.project.task.save", { id: Id }),{
            onSuccess: ()=> {
                setMsg('Task Created Successfully .')
                setData({});
                setOpen(false);
                setSeverity('success');
            },onError:(error) => {
                setMsg(error.message)
                setSeverity('error');
            },
        })
           :auth.user.user_role == "project manager" &&
           post(route("projectManager.project.task.save", { id: Id }),{
            onSuccess: ( )=> {
                setSeverity('success');
                setMsg('Task Created Successfully .')
                setData({});
                setOpen(false);
            },onError:(error) => {
                setMsg(error.message);
                setSeverity('error');
            },
        })
        }
    };

    return (
        <div>
            {
                msg && <SuccessMsg severity={severity} error={msg} setError={setMsg} title={msg}/>
            }
            <Button
                variant="contained"
                onClick={handleOpen}
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
                                    Create Task
                                </Typography>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <InputLabel
                                    htmlFor="task-name"
                                    value="Task Name"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                />

                                <TextInput
                                    id="task_name"
                                    name="task_name"
                                    value={data.task_name}
                                    className="mt-1 block w-full"
                                    autoComplete="task_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("task_name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.task_name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
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
                                    htmlFor="Assign Date"
                                    value="Assign Date"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                />

                                <TextInput
                                    id="start_date"
                                    type="datetime-local"
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

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "",
                                }}
                            >
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="priority"
                                        value="Priority"
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <Select
                                        value={data.priority}
                                        name="priority"
                                        style={{
                                            height: "42px",
                                            width: "355px",
                                        }}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                        required
                                    >
                                        <MenuItem selected>
                                            Choose Priority
                                        </MenuItem>

                                        {priority.map((prio, index) => (
                                            <MenuItem
                                                key={index}
                                                value={prio}
                                                label={prio}
                                            >
                                                {prio}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="level"
                                        value="Task Level"
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                            marginLeft: "20px",
                                        }}
                                    />
                                    <Select
                                        value={data.level}
                                        name="level"
                                        style={{
                                            height: "42px",
                                            width: "350px",
                                            marginLeft: "20px",
                                        }}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
                                        onChange={(e) =>
                                            setData("level", e.target.value)
                                        }
                                        required
                                    >
                                        <MenuItem selected>
                                            Choose Label
                                        </MenuItem>
                                        {level.map((lab, index) => (
                                            <MenuItem
                                                key={index}
                                                value={lab}
                                                label={lab}
                                            >
                                                {lab}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.label}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">

                                <InputLabel
                                    htmlFor="Assign to"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                > Assign To - Project Manager <Chip label="PM" color="success" size="small" style={{ fontSize:'10px' }}/> &emsp; Developer <Chip label="D" size="small" style={{ fontSize:'10px' ,background:'gray',color:'white' }}/>
                                </InputLabel>
                                {/* <Select
                                    multiple
                                    value={data.developer}
                                    style={{ height: "42px" }}
                                    onChange={handleDeveloperSelect}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                >
                                    {developer.map(
                                        (dev, index) => (
                                            (
                                                <MenuItem
                                                    key={index}
                                                    value={dev.id}
                                                    label={dev.name}
                                                >
                                                    {dev.name} (
                                                    {dev.user_role ==
                                                    "senior_developer"
                                                        ? "Senior"
                                                        : "Junior"}
                                                    )
                                                </MenuItem>
                                            )
                                        )
                                    )}
                                </Select> */}
                                <Grid item xs={12}>
                                    { developer.length == 0 ? (
                                        <Alert severity="info">
                                            Don't Have Any Developer
                                        </Alert>
                                    ) : (
                                        developer.map((user, index) => (
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
                                    )}
                                </Grid>
                                <InputError
                                    message={errors.developer}
                                    className="mt-2"
                                />
                            </div>


                            <div className="flex items-center justify-center m-8">
                            <Button onClick={handleClose} variant="contained" color="error"
                                    style={{
                                        height: "33px", marginLeft:"10px"
                                    }}
                                    startIcon={<CloseIcon/>}>Cancle</Button>
                                <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }}
                                ><SaveIcon sx={{ height:'15px' }}/>
                                    Create Task
                                </PrimaryButton>

                            </div>
                        </form>
                    </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
