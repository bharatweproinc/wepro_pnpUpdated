import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import {  useForm } from "@inertiajs/react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useState } from "react";
import SuccessMsg from "../SuccessMsg";
import PhoneValidate from "@/Util/PhoneValidate";
import Joi from "@/Util/JoiValidator";
import ValdidationSchema from "./Components/ValidationSchema";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p:3,
    overflow:'scroll',
    height:'90%',
    display:'block',
};

export default function Create({ auth }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [image,setImage] = useState(null);
    const [alert ,setAlert] = useState(false);
    const [severity ,setSeverity] = useState(null);
    const { data, setData, get, post, processing, errors, reset ,setError } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_role: "",
        salary: "",
        profile:null,
    });

    const handleClose = () => {
        setOpen(false);
        setData({});
    };
    const handleProfile =(event) =>{
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
          }
    }
    const handleDelete = (event) => {
        setData('profile',null);
        setImage(null);
        };
    const submit = (e) => {
        e.preventDefault();
            {
            auth.user.user_role === "admin" ?
            post(route("admin.user.save"), {
                onSuccess: ( )=> {
                    setAlert("User Created Successfully");
                    handleClose();
                    setData({});
                    setOpen(false);
                    setSeverity('success');
                },onError:(error)=>{
                    setAlert(error.error)
                    setSeverity('error');
                }
            })
            :
            post(route('hrManager.user.save'),{
                onSuccess: ()=> {
                    setAlert("User Created Successfully");
                    handleClose();
                    setData({});
                    setOpen(false);
                    setSeverity('success');
                },onError:(error)=>{
                    setAlert(error.error)
                    setSeverity('error');
                }
            })
        }

    };

    function handleChange(key,val) {
        setError({
            ...errors,
            [key]: Joi.validateToPlainErrors(val,ValdidationSchema.USER_SCHEMA[key])
        });
        setData({
            ...data,
            [key]: val,
        });
    }

    return (
        <div>
            {alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert}/>}
        <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />} >  Create</Button>
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{  backdrop: {  timeout: 500,}, }}>
            <Fade in={open}>
                <Box sx={style} style={{ width: "800px" }}>
                <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >
                    <div style={{alignItems: "center",display: "flex",justifyContent: "center",paddingBottom:"10px"}}>
                    <form onSubmit={submit}>
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
                                Create User
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => handleChange("password", e.target.value)}
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => handleChange("password_confirmation",e.target.value)}
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="contact_no" value="Phone No" />

                            <TextInput
                                id="contact_no"
                                type="number"
                                name="contact_no"
                                value={data.contact_no}
                                className="mt-1 block w-full"
                                autoComplete="contact_no"
                                onChange={(e) => PhoneValidate(e, 10, handleChange)}
                                required
                            />

                            <InputError
                                message={errors.contact_no}
                                className="mt-2"
                            />
                        </div>

                       <div className="mt-4">
                            <FormControl component="fieldset">
                                <InputLabel
                                    htmlFor="user_role"
                                    value="Select User Role"
                                />
                                <RadioGroup
                                    value={data.user_role}
                                    onChange={(e) => handleChange("user_role", e.target.value)}
                                    row
                                >
                                    {
                                        auth.user.user_role=="admin" &&
                                        <FormControlLabel
                                        value="admin"
                                        control={<Radio />}
                                        label="Admin"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                    }

                                    <FormControlLabel
                                        value="hr manager"
                                        control={<Radio />}
                                        label="HR Manager"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                    <FormControlLabel
                                        value="project manager"
                                        control={<Radio />}
                                        label="Project Manager"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                    <FormControlLabel
                                        value="senior developer"
                                        control={<Radio />}
                                        label="Senior Developer"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                    <FormControlLabel
                                        value="junior developer"
                                        control={<Radio />}
                                        label="Junior Developer"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <InputError
                                message={errors.user_role}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="profile" value="Profile Photo" />

                             <input type="file" className="mt-1 block w-full filetype"
                             id="profile" name="profile" accept="image/png, image/jpeg ,image/jpeg , image/svg"
                              onChange={(event)=>{handleChange('profile',event.target.files[0]);handleProfile(event)}}
                             />
                             {
                                data.profile &&
                                <>
                                       <div style={{ position:'relative' }}>
                                         <img alt="preview image" className="pt-4" src={image}  style={{ width: '200px', height: '150px' }}/>

                                        <Button
                                            style={{
                                                position: 'absolute',
                                                top: '15px',
                                                left: '155px',
                                             }}
                                             onClick={handleDelete} >
                                            <DeleteIcon color="error" />
                                        </Button>
                                       </div>
                                </>
                             }
                             <InputError
                                message={errors.profile}
                                className="mt-2"
                            />
                        </div>

                        {data.user_role === "admin" ? (
                            <div className="flex items-center justify-center m-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }}
                                >
                                   <SaveIcon sx={{ height:'15px' }}/> Create
                                </PrimaryButton>
                            </div>
                        ) : (
                            <>

                                <div className="flex items-center justify-center mt-10">
                                    <Button onClick={handleClose} variant="contained" color="error" style={{ height: "33px", marginLeft:"10px",}}><CloseIcon/> Close</Button>
                                    <PrimaryButton className="ms-4" disabled={processing} style={{ height: "40px", backgroundColor: "#1976d2", }}>
                                       Next <NavigateNextIcon sx={{ height:"15px" }}/>
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                    </form>
                    </div>
                </div>

                </Box>
                </Fade>
            </Modal>
        </div>
    );
}
