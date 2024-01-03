import * as React from "react";
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
    Grid,
    Radio,
    RadioGroup,
    Select,
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
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p:2,
    overflow:'scroll',
    height:'90%',
    display:'block',
};

export default function Create({ auth ,states}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [image,setImage] = useState(null);
    const [alert ,setAlert] = useState(false);
    const [severity ,setSeverity] = useState(null);
    const [selectCity ,setSelectCity] = useState([]);
    const { data, setData, get, post, processing, errors, reset ,setError } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_role: "",
        dob:"",
        gender:"",
        local_address:"",
        residential_address:"",
        profile:null,
        contact_no:"",
        alt_phone_no:"",
        state:"",
        city:"",
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

        if (key === "state") {
            const selectedState = states.find((state) => state.id === parseInt(val));
            const citiesArray = selectedState ? selectedState.cities : [];
            setData({
                ...data,
                state: val,
                city: "",
            });
            setSelectCity(citiesArray);
            console.log(citiesArray, 'sdgfjds');
        } else if (key === "city") {
            setData({ ...data,
                city: val,
            });
        } else {
            setData({
                ...data,
                [key]: val,
            });
        }
    }


    return (
        <div>
            {alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert}/>}
        <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>Create</Button>
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{  backdrop: {  timeout: 500,}, }}>
            <Fade in={open}>
                <Box sx={style}>
                <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >
                    <div style={{alignItems: "center",display: "flex",justifyContent: "center",paddingBottom:"10px"}}>
                    <form onSubmit={submit}>
                        <div style={{alignItems: "center", display: "flex",justifyContent: "center", paddingBottom: "30px", }} >
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Create User</Typography>
                        </div>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                            <InputError message={errors.name}className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
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
                            <InputError message={errors.email} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
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
                            <InputError message={errors.password} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
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
                            <InputError message={errors.password_confirmation} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
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
                            <InputError message={errors.contact_no} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="Alt Phone no" value="Alternative Phone No" />
                            <TextInput
                                id="alt_phone_no"
                                type="number"
                                name="alt_phone_no"
                                value={data.alt_phone_no}
                                className="mt-1 block w-full"
                                autoComplete="alt_phone_no"
                                onChange={(e) => PhoneValidate(e, 10, handleChange)}
                                required
                            />
                            <InputError message={errors.alt_phone_no} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="Date of Birth" value="Date Of Birth" />
                            <TextInput
                                id="dob"
                                type="date"
                                name="dob"
                                value={data.dob}
                                className="mt-1 block w-full"
                                autoComplete="dob"
                                onChange={(e) =>handleChange("dob",e.target.value)}
                                required
                            />
                            <InputError message={errors.dob} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="pin_code" value="Pin Code" />
                            <TextInput
                                id="pin_code"
                                type="number"
                                name="pin_code"
                                value={data.pin_code}
                                className="mt-1 block w-full"
                                autoComplete="pin_code"
                                onChange={(e) => PhoneValidate(e, 6, handleChange)}
                                required
                            />
                            <InputError message={errors.pin_code} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="state" value="State" />
                            <select
                                id="state"
                                name="state"
                                value={data.state}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="state"
                                onChange={(e) =>handleChange("state",e.target.value)}
                                required
                            >
                                <option value="">Select State</option>
                                {
                                    states.map((state,index)=><option value={state.id} key={index}>{state.state_name}</option>)
                                }
                            </select>
                            <InputError message={errors.state} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="city" value="City" />
                            <select
                                id="city"
                                name="city"
                                size="samll"
                                value={data.city}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="dob"
                                onChange={(e) =>handleChange("city",e.target.value)}
                                required
                            >
                                <option value="">Select City</option>
                               {selectCity && selectCity.map((city,index)=><option value={city.id} key={index}>{city.cities}</option>) }

                            </select>
                            <InputError message={errors.city} className="mt-2"/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="local address" value="Local Address" />
                            <textarea
                                id="local_address"
                                name="local_address"
                                value={data.local_address}
                                rows={3}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="local_address"
                                onChange={(e) =>handleChange("local_address",e.target.value)}
                                required
                            />
                            <InputError message={errors.local_address} className="mt-2"/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="residential address" value="Residential Address" />
                            <textarea
                                id="residential_address"
                                name="residential_address"
                                value={data.residential_address}
                                rows={3}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="residential_address"
                                onChange={(e) =>handleChange("residential_address",e.target.value)}
                                required
                            />
                            <InputError message={errors.residential_address} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <InputLabel htmlFor="gender" value="Select Gender" />
                                <RadioGroup
                                    value={data.gender}
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                    row
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                        aria-setsize={"small"}
                                        style={{ paddingRight:'10px' }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <InputError message={errors.gender} className="mt-2"/>
                        </Grid>

                        <Grid item xs={12}>
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
                            <InputError message={errors.user_role} className="mt-2"/>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>

                        {data.user_role === "admin" ?
                            <Grid item xs={12} className="flex items-center justify-center m-4">
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
                            </Grid>
                            :
                            <Grid item xs={12} className="flex items-center justify-center mt-10">
                                    <Button onClick={handleClose} variant="contained" color="error" style={{ height: "33px", marginLeft:"10px",}}><CloseIcon/> Close</Button>
                                    <PrimaryButton className="ms-4" disabled={processing} style={{ height: "40px", backgroundColor: "#1976d2", }}>
                                       Next <NavigateNextIcon sx={{ height:"15px" }}/>
                                    </PrimaryButton>
                            </Grid>
                        }
                        </Grid>
                    </form>
                    </div>
                </div>

                </Box>
                </Fade>
            </Modal>
        </div>
    );
}
