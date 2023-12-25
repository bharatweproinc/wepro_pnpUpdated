import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, router, useForm, } from "@inertiajs/react";
import UpdateIcon from '@mui/icons-material/Update';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    Button,
    Chip,
    Grid,
    Typography,
} from "@mui/material";
import InputError from "@/Components/InputError";
import { useEffect } from "react";
import SuccessMsg from "@/Components/Common/SuccessMsg";

export default function Edit({ data, auth, developer, manager, devId }) {

    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const { post, processing, errors, reset } = useForm();
    const [alert,setAlert] = useState(false);
    const [severity,setSeverity]= useState(null);

    const [item, setItem] = useState({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        project_manager: data.project_manager,
        developer: devId,
    });

    const handleChange = (e) => {
        setItem((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const allDeveloper = developer.concat(manager);
    useEffect(()=>{
        setItem((prev)=>({
            title: prev.title,
            description: prev.description,
            start_date: prev.start_date,
            end_date: prev.end_date,
            project_manager: prev.project_manager,
            developer: prev.developer,
        }));
    },[data]);
    const handleDeveloper = (id) => {
        setItem((prev) => ({
            ...prev,
            developer: prev.developer
                ? prev.developer.includes(id)
                    ? prev.developer.filter((value) => value !== id)
                    : [...prev.developer, id]
                : [id],
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.project.update", [data.id]), item ,{
            onSuccess:()=>{
                setAlert("Project Updated .");
                setSeverity("success");
            },onError:(error)=>{
                setAlert(error.error);
                setSeverity("error");
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {
                alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert}/>
            }
            <div className="mt-5 flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
                <Head title="Update Project" />

                <div
                    className=" mt-0 px-2 py-2 shadow-md bg-white overflow-hidden"
                    style={{
                        width: "50%",
                        alignContent: "center",
                        justifyContent: "space-between",
                    }} >
                <div className="rounded-t-lg bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >

                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "10px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{ fontWeight: "bold"}}
                            >
                                Edit Project
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={item.title}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => handleChange(e)}
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
                                value={item.description}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="Manager"
                                value="Select Manager"
                            />
                            <select
                                value={item.project_manager}
                                name="project_manager"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                onChange={(e) => handleChange(e)}
                                required
                            >
                                {manager.map((mngr, index) => {
                                    return (
                                        <option value={mngr.name} key={index}>
                                            {mngr.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <InputError
                                message={errors.project_manager}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                        <InputLabel htmlFor="Assign to">
                             Assign To - Project Manager <Chip label="PM" color="success" size="small" style={{ fontSize:'10px' }}/> &emsp; Developer <Chip label="D" size="small" style={{ fontSize:'10px',background:'gray',color:'white' }}/>
                        </InputLabel>


                            <Grid item xs={12}>
                                {allDeveloper.map((user, index) => (
                                     <Button
                                     key={index}
                                     variant={item.developer?.includes(user.id) ? "contained" : "outlined"}
                                     size="small"
                                     onClick={()=>handleDeveloper(user.id)}
                                     style={{ margin: "2px" }}
                                     endIcon={<Chip style={{ fontSize:'10px' }} label={user.user_role =="project manager" ? "PM" : "D"} color={user.user_role =="project manager" ? "success" : "primary" } sx={user.user_role !=="project manager" && { background:'gray'  }} size="small"/>}
                                 >
                                     {user.name}
                                 </Button>
                                ))}
                            </Grid>
                            <InputError
                                message={errors.developer}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-center m-8">
                            <Button variant="contained"  color="error" onClick={() => window.history.back()}
                                sx={{ height:'35px',width:'120px',borderRadius:'0.375rem',fontSize:"0.80rem" }}>
                                <ArrowBackIosIcon sx={{ height:'15px' }}/>previous</Button>
                            <PrimaryButton
                                className="ms-4"
                                variant="contained"
                                disabled={processing}
                                style={{
                                    backgroundColor: "#1976d2",
                                }}
                            >
                               <UpdateIcon sx={{ height:'15px' }}/> Update
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
