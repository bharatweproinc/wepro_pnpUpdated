import * as React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SuccessMsg from "../SuccessMsg";
import PhoneValidate from "@/Util/PhoneValidate";
import Joi from "@/Util/JoiValidator";
import ValdidationSchema from "./Components/ValidationSchema";
import {  router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Select,
} from "@mui/material";

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
export default function  Edit({ auth, user,states,address})  {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [selectCity, setSelectCity] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Basic Details", "address Details"];
  const handleOpen = () => setOpen(true);

  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    user_role: user.user_role,
    contact_no: user.contact_no,
    profile:user.profile,
    dob:user.dob,
    gender:user.gender,
    local_address:address?.local_address,
    residential_address:address?.residential_address,
    alt_phone_no:user?.alt_phone_no,
    state:address?.state,
    city:address?.city,
    pin_code:address?.pin_code,
});

console.log(value.state,address.state,'address');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };
  const handleClose = () => {
    setOpen(false);
}
const handleChange = (key,val) => {

    setError({
        ...errors,
        [key]: Joi.validateToPlainErrors(val,ValdidationSchema.USER_SCHEMA[key])
    });
    if (key === "state") {
        const selectedState = states.find((state) => state.id === parseInt(val));
        const citiesArray = selectedState ? selectedState.cities : [];
        setValue({
            ...value,
            state: val,
            city: "",
        });
        setSelectCity(citiesArray);
    } else if (key === "city") {
        setValue({ ...value,
            city: val,
        });
    } else {
        setValue({
            ...value,
            [key]: val,
        });
    }
};

const handleImage = () => {
    document.getElementById('profile').click();
};

const handleProfile =(event) =>{
    if (event.target.files && event.target.files[0]) {
       const url= URL.createObjectURL(event.target.files[0]);
       const urlImg =  url.replace('blob:', '');
       setImage(url);
       setValue((prev)=>({...prev,profile:event.target.files[0]}));
      }
}
const { get, post, processing, errors, reset,setError,} = useForm()
    useEffect(()=>{
    setValue((prev)=>({
        name: prev.name,
        email: prev.email,
        user_role: prev.user_role,
        contact_no: prev.contact_no,
        profile:prev.profile,
        dob:prev.dob,
        gender:prev.gender,
        gender:user.gender,
        local_address:prev.local_address,
        residential_address:prev.residential_address,
        alt_phone_no:prev.alt_phone_no,
        state:prev.state,
        city:prev.city || address?.city,
        pin_code:prev.pin_code,
}));
        const selectedState = states.find((state) => state.id === parseInt(value.state));
        const citiesArray = selectedState ? selectedState.cities : [];
        setSelectCity(citiesArray);
}, [address, states, value.state]);

const handleSubmit = (e) => {
    e.preventDefault();
    const root = (auth.user.user_role =="admin"? "admin.user.update" :auth.user.user_role == "hr manager"&& "hrManager.user.update");

    router.post(route(root, [user.id]), value ,{
        onSuccess: ( )=> {
            setAlert("User Updated Successfully");
            handleClose();
            setOpen(false);
            setSeverity('success');
            setActiveStep(0)
        },onError:(error)=>{
            setAlert(error.error)
            setSeverity('error');
            setActiveStep(0)
        }
    })

};

  return (
    <div>
      {alert && (
        <SuccessMsg
          severity={severity}
          error={alert}
          setError={setAlert}
          title={alert}
        />
      )}
        <IconButton aria-label="edit" color={(auth.user.user_role =="hr manager" && user.user_role=='admin') ? 'error' : 'info'} onClick={handleOpen} disabled={(auth.user.user_role=="hr manager" && user.user_role =='admin') ? true :false} >
                <EditIcon/>
        </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
          handleReset();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {activeStep === steps.length ? (
                      <div>
                        <Typography>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                      </div>
                    ) : (
                      <div>
                        {activeStep === 0 && (
                          <>
                          <div >
                          <div style={{ display:'flex',justifyContent:'center' }}>
                              <InputLabel htmlFor=" profile">
                                  <img id="image" src={image} alt="Profile" style={{ borderRadius:'50%' ,
                                      border:"2px solid black",cover:'100%', objectFit:'contain',height:'100px'
                                      ,width:'100px',textAlign:'center',lineHeight:'80px'}} onClick={handleImage}/>
                                  <CameraAltIcon style={{ position:'absolute',top:'165px',right:'345px',color:'black',borderRadius:'50%',background:'aliceblue' }}/>

                              </InputLabel>
                               <input type="file" id="profile" name="profile" accept="image/png, image/jpeg ,image/jpeg , image/svg"
                                   onChange={(event)=>handleProfile(event)} hidden/>
                           </div>
                          <InputError message={errors.profile} className="mt-2" />
                      </div>
                      <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput id="name" name="name" value={value.name} className="mt-1 block w-full" autoComplete="name" isFocused={true} onChange={(e) => handleChange("name",e.target.value)} required  />
                                    <InputError message={errors.name} className="mt-2" />
                                </Grid>

                                <Grid item xs={6} >
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput id="email" type="email" name="email" value={value.email} className="mt-1 block w-full" autoComplete="email" onChange={(e) => handleChange("email",e.target.value)} required />
                                    <InputError message={errors.email} className="mt-2" />
                                </Grid>
                                <Grid item xs={6} >
                                    <InputLabel htmlFor="contact_no" value="Phone No" />
                                    <TextInput id="contact_no" type="number" name="contact_no" value={value.contact_no} className="mt-1 block w-full" autoComplete="contact_no" onChange={(e) => PhoneValidate(e, 10, handleChange)} required/>
                                    <InputError message={errors.contact_no} className="mt-2" />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="Alt Phone no" value="Alternative Phone No" />
                                    <TextInput
                                     id="alt_phone_no"
                                        type="number"
                                        name="alt_phone_no"
                                        value={value.alt_phone_no}
                                        className="mt-1 block w-full"
                                        autoComplete="alt_phone_no"
                                        onChange={(e) => PhoneValidate(e, 10, handleChange)}
                                        required
                                    />
                            <InputError message={errors.alt_phone_no} className="mt-2"/>
                        </Grid>
                                <Grid item xs={12} >
                            <InputLabel htmlFor="Date of Birth" value="Date Of Birth" />
                            <TextInput
                                id="dob"
                                type="date"
                                name="dob"
                                value={value.dob}
                                className="mt-1 block w-full"
                                autoComplete="dob"
                                onChange={(e) =>handleChange("dob",e.target.value)}
                                required
                            />
                            <InputError message={errors.dob} className="mt-2"/>
                        </Grid>

                        <Grid item xs={6} >
                            <FormControl component="fieldset">
                                <InputLabel htmlFor="gender" value="Select Gender" />
                                <RadioGroup
                                    value={value.gender}
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

                                <Grid item xs={12} >
                                    <FormControl component="fieldset">
                                        <InputLabel
                                            htmlFor="user_role"
                                            value="Select User Role"
                                        />
                                        <RadioGroup value={value.user_role} onChange={(e)=>handleChange("user_role",e.target.value)} name="user_role"row>
                                            {
                                            auth.user.user_role == "admin"  && <FormControlLabel value="admin" control={<Radio />} label="Admin" aria-setsize={"small"}/>
                                            }
                                            <FormControlLabel value="hr manager" control={<Radio />} label="HR Manager" aria-setsize={"small"} />
                                            <FormControlLabel value="project manager" control={<Radio />} label="Project Manager" aria-setsize={"small"} />
                                            <FormControlLabel value="senior developer" control={<Radio />} label="Senior Developer" aria-setsize={"small"} />
                                            <FormControlLabel value="junior developer" control={<Radio />} label="Junior Developer" aria-setsize={"small"} />
                                        </RadioGroup>
                                    </FormControl>
                                    <InputError message={errors.user_role} className="mt-2" />
                                </Grid>

                                {/* <Grid item xs={6} className="flex items-center justify-center mt-4">
                                    <Button onClick={handleClose} variant="contained" color="error"
                                    style={{ height: "33px", marginLeft:"10px" }} startIcon={<CloseIcon/>}> Cancle</Button>
                                    <PrimaryButton className="ms-4" style={{ height: "40px", backgroundColor: "#1976d2",width: "150px", alignItems: "center",
                                    display: "flex", justifyContent: "center",textTransform:"none"  }} > <UpdateIcon sx={{ height:'15px' }}/> Update  </PrimaryButton>
                                </Grid> */}
                                </Grid>
                          </>
                        )}

                        {activeStep === 1 && (
                          <Grid container spacing={2}>
                             <Grid item xs={12}>
                            <InputLabel htmlFor="pin_code" value="Pin Code" />
                            <TextInput
                                id="pin_code"
                                type="number"
                                name="pin_code"
                                value={value.pin_code}
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
                                value={value.state}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="state"
                                onChange={(e) =>handleChange("state",e.target.value)}
                                required
                           >
                                <option value="">Select State</option>
                                {
                                    states?.map((state,index)=><option value={state.id} key={index}>{state.state_name}</option>)
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
                                value={value.city}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="city"
                                onChange={(e) =>handleChange("city",e.target.value)}
                                required
                           >
                                <option value="">Select City</option>
                               {selectCity && selectCity.map((city,index)=><option value={city.id} key={index}>{city.cities}</option>) }

                            </select>
                            <InputError message={errors.city} className="mt-2"/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="local address" value="Local address" />
                            <textarea
                                id="local_address"
                                name="local_address"
                                value={value.local_address}
                                rows={3}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="local_address"
                                onChange={(e) =>handleChange("local_address",e.target.value)}
                                required
                            />
                            <InputError message={errors.local_address} className="mt-2"/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="residential address" value="Residential address" />
                            <textarea
                                id="residential_address"
                                name="residential_address"
                                value={value.residential_address}
                                rows={3}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="residential_address"
                                onChange={(e) =>handleChange("residential_address",e.target.value)}
                                required
                            />
                            <InputError message={errors.residential_address} className="mt-2"/>
                        </Grid>
                          </Grid>
                        )}

                        <div className="flex items-center justify-center m-4">
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="contained"
                            sx={{ marginRight:'10px' }}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                          >
                            {activeStep === steps.length - 1
                              ? "Update"
                              : "Next"}
                            {activeStep === steps.length - 1 && (
                              <SaveIcon sx={{ ml: 1 }} />
                            )}
                            {activeStep !== steps.length - 1 && (
                              <NavigateNextIcon sx={{ ml: 1 }} />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
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
