import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "@inertiajs/react";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { differenceInDays, parseISO } from "date-fns";

import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SuccessMsg from "../../SuccessMsg";
import { useState } from "react";
import { useEffect } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow:'scroll',
    height:'90%',
    display:'block',
};

export default function Create({ auth ,Id ,user}) {
    const [open, setOpen] = useState(false);
    const [alert,setAlert] = useState(false);
    const [severity,setSeverity] = useState(null);
    const [effect,setEffect] = useState(false);
    const [expand ,setExpand] = useState(user?.length > 0 ? true :false);
    const [unique ,setUnique] = useState(Id);
    const handleOpen=(e)=>setOpen(true);

    const { data, setData, get, post, processing, errors, reset } = useForm({
        description: "",
        requested_date: "",
        subject: "",
        to_date: "",
        reason: null,
        days:'',
        file:"",
        user:'',
    });

    useEffect(()=>{
        const day = differenceInDays(parseISO(data.to_date),parseISO(data.requested_date))+" day";
        setData('days',day);
        setEffect(false);
    },[effect]);

    const handleUser = (e) => {
        setData('user',e.target.value);
        setUnique(e.target.value);
    }


    const submit = (e) => {
        e.preventDefault();
        {
            auth.user.user_role === "admin"
                ? post(route("admin.user.leave.save",{id:unique}), {
                      onSuccess: () => {
                          setAlert('Leave Created successfully.');
                          setOpen(false);
                          setSeverity('success');
                          setData({});
                      },onError:()=>{
                        setAlert('Something is wrong !')
                        setSeverity('error');
                    }
                  })
                : post(route("hrManager.user.leave.save",{id:Id}), {
                      onSuccess: () => {
                          setAlert('Leave Created successfully.');
                          setOpen(false);
                          setData({});
                          setSeverity('success');
                      },onError:()=>{
                        setAlert('Something is wrong !')
                        setSeverity('error');
                    }
                  });
        }
    };

    const handleClose = () => {
        setOpen(false);
        setData({});
    }

    return (
        <div>
            {
                alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert}/>
            }
            <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                Leave
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
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
                                }}
                            >
                                <form onSubmit={submit}>
                                    <div
                                        style={{
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Leave form
                                        </Typography>
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        <InputLabel
                                            htmlFor="Subject"
                                            value="Subject"
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        />
                                        <TextInput
                                            id="subject"
                                            type="text"
                                            name="subject"
                                            value={data.subject}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            autoComplete="subject"
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.subject}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="Description"
                                            value="Description"
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        />

                                        <textarea
                                            id=""
                                            type="text"
                                            name="description"
                                            rows={3}
                                            value={data.description}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            autoComplete="description"
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.description}
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
                                                htmlFor="requested_date"
                                                value="Requested Date"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                }}
                                            />
                                            <TextInput
                                                id="requested_date"
                                                type="date"
                                                name="requested_date"
                                                value={data.requested_date}
                                                className="mt-1 block w-full"
                                                autoComplete="from_date"
                                                onChange={(e) =>
                                                   ( setData(
                                                        "requested_date",
                                                        e.target.value
                                                    ),setEffect(true))
                                                }
                                                required
                                                style={{
                                                    height: "42px",
                                                    width: "252px",
                                                }}
                                            />
                                            <InputError
                                                message={errors.requested_date}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="To Date"
                                                value="To Date"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                    marginLeft: "10px",
                                                }}
                                            />

                                            <TextInput
                                                id="to_date"
                                                type="date"
                                                name="to_date"
                                                value={data.to_date}
                                                className="mt-1 block w-full"
                                                autoComplete="to_date"
                                                onChange={(e) =>
                                                   ( setData(
                                                        "to_date",
                                                        e.target.value
                                                    ),
                                                    setEffect(true))
                                                }
                                                required
                                                style={{
                                                    height: "42px",
                                                    width: "252px",
                                                    marginLeft: "10px",
                                                }}
                                            />
                                            <InputError
                                                message={errors.to_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mt-4">
                                        <InputLabel
                                            htmlFor="Days"
                                            value="Days"
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                marginLeft: "10px",
                                            }}
                                        />
                                        <TextInput
                                            id="days"
                                            type="text"
                                            name="days"
                                            value={data.days == 'NaN day' ? "" :data.days}
                                            className="mt-1 block w-full"
                                            autoComplete="days"
                                            required
                                            disabled
                                            style={{
                                                height: "42px",
                                                width: "252px",
                                                marginLeft: "10px",
                                            }}
                                        />

                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>
                                    </div>

                                    {(data.days == '0 day' ||  data.days == 'half day' ||  data.days == 'full day'
                                       ||data.days == 'first half' || data.days =='second half') &&(
                                        <div className="mt-4" style={{ display:'flex' }}>
                                        <FormControl component="fieldset">
                                        <RadioGroup
                                            value={data.days}
                                            onChange={(e) =>
                                                setData("days", e.target.value)
                                            }
                                            row
                                        >

                                        <FormControlLabel
                                            value="full day"
                                            control={<Radio />}
                                            label="Full Day"
                                            aria-setsize={"small"}
                                            style={{ paddingRight:'10px' }}
                                        />

                                        <FormControlLabel
                                            value="half day"
                                            control={<Radio />}
                                            label="Half Day"
                                            aria-setsize={"small"}
                                            style={{ paddingRight:'10px' }}
                                            checked={data.days=='first half' || data.days == 'second half' || data.days == 'half day'}
                                        />
                                        </RadioGroup>
                                        </FormControl>

                                        { (data.days == 'half day'|| data.days == 'first half' || data.days =='second half') &&(
                                        <>
                                        <FormControl component="fieldset">
                                        <RadioGroup
                                            value={data.days}
                                            onChange={(e) =>
                                                setData("days", e.target.value)
                                            }
                                            row
                                        >

                                        <FormControlLabel
                                            value="first half"
                                            control={<Radio />}
                                            label="First Half"
                                            aria-setsize={"small"}
                                            style={{ paddingRight:'10px' }}
                                        />

                                        <FormControlLabel
                                            value="second half"
                                            control={<Radio />}
                                            label="Second Half"
                                            aria-setsize={"small"}
                                            style={{ paddingRight:'10px' }}
                                        />
                                        </RadioGroup>
                                        </FormControl>

                                        </>
                                    )}
                                            <InputError
                                                message={errors.days}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}
                                    {
                                       expand &&
                                        <div className="mt-4">
                                        <InputLabel
                                            htmlFor="File"
                                            value="Select User"
                                            style={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        />
                                        <select value={data.user} onChange={handleUser} className="w-full block" required>
                                            <option>Select User</option>
                                            {
                                                user?.map((name,index)=>{
                                                    return (
                                                           ( name.user_role !="admin") &&
                                                            <option value={name.id} key={index} label={name.name}>{name.name}</option>
                                                    );
                                                })
                                            }
                                        </select>

                                </div>
                                    }

                                    <div className="mt-4">
                                            <InputLabel
                                                htmlFor="File"
                                                value="Upload File"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                }}
                                            />
                                           <input type="file" onChange={e => setData('file', e.target.files[0])}/>
                                            <InputError
                                                message={errors.file}
                                                className="mt-2"
                                            />
                                    </div>

                                    <div className="flex items-center justify-center m-8">
                                    <Button
                                            onClick={handleClose}
                                            variant="contained"
                                            color="error"
                                            style={{
                                                height: "33px",
                                                marginLeft: "10px",
                                            }}
                                            startIcon={<CloseIcon/>}
                                        >
                                            Cancle
                                        </Button>
                                        <PrimaryButton
                                            className="ms-4"
                                            variant="contained"
                                            disabled={processing}
                                            style={{
                                                height: "40px",
                                                backgroundColor: "#1976d2",
                                            }}
                                        ><SaveIcon sx={{ height:'15px' }}/>
                                            Save
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
