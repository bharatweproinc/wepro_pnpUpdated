import FormatDate from "@/Util/FormatDate";
import { router, useForm } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import {
    Alert,
    Box,
    Chip,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Tooltip,
    Typography,
} from "@mui/material";
import DateTimeFormat from "@/Util/DateTimeFormat";
import { useState } from "react";
import Edit from "./Edit";
import StatusPopup from "./StatusPopup";
import SaveIcon from "@mui/icons-material/Save";
import StartTimerPopUp from "../Components/StartTimerPopup";
import PauseorUpdateTime from "../Components/PauseOrUpdateTime";
import StatusStyle from "../Components/StatusStyle";

export default function Detail({ data, developer, auth, devId, updated }) {

    const { item, setItem, get, post, processing, errors, reset } = useForm();
    const [openStart, setopenStart] = useState(false);
    const [state, setState] = useState({
        status: data.status,
    });
    const [isEdit, setIsEdit] = useState(false);
    const handleUpdate = (id) => {
        get(route("admin.project.task.edit", { id }));
    };

    const dev_id = data.developer_id.split(",");
    const dev = dev_id.map((item,j) => Number(item));

    const handleStatus = () => {
        setIsEdit(true);
    };
    const handleChange = (e) => {
        setopenStart(true);
        setState({ status: e.target.value });
    };

    const pauseStatus = (item) => {
        {
            auth.user.user_role == "admin" ? (
                router.post(route("admin.project.task.status", { id: updated[0].id }),item ,
                { onSuccess: ()=>{ onSubmit()}})
            ) : auth.user.user_role == "project manager" ? (
                router.post(route("projectManager.project.task.status", { id: updated[0].id }),item,
                { onSuccess: ()=>{ onSubmit()}})
            ) : auth.user.user_role == "senior developer" ? (
                router.post(route("developer.project.task.status", { id: updated[0].id }),item,
                { onSuccess: ()=>{ onSubmit()}})
            ) : auth.user.user_role == "junior developer" && (
                router.post(route("developer.project.task.status", { id: updated[0].id }),item,
                { onSuccess: ()=>{ onSubmit()}})
            )
        }
    }

    const statusSubmit = () => {
        {
            auth.user.user_role == "admin" ? (
                router.post(
                    route("admin.project.task.status", { id: data.id }),state,
                    {
                        onSuccess: () => {},
                    }
                )
            ) : auth.user.user_role == "project manager" ? (
                router.post(
                    route("projectManager.project.task.status", {id: data.id,}),state,
                    {
                        onSuccess: () => {},
                    }
                )
            ) : auth.user.user_role == "senior developer" ? (
                router.post(route("developer.project.task.status", { id: data.id }),state)
            ) : auth.user.user_role == "junior developer" && (
                router.post(route("developer.project.task.status", { id: data.id }), state)
            )
        }
        setIsEdit(false);
    };

    return (
        <>
            <Box
                sx={{
                    flexGrow: 10,
                    margin: "2%",
                    background: "#f9f9f9",
                    boxShadow: "2px 2px 2px 2px #e3e1da",
                    padding: "40px",
                }}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "50px",
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                            Task Information
                        </Typography>

                        {auth.user.user_role !== "hr manager" ||
                            auth.user.user_role !== "junior developer" ||
                            (auth.user.user_role !== "senior developer" && (
                                <Edit
                                    devId={dev.id}
                                    developer={developer}
                                    data={data}
                                    auth={auth}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                    }}
                                />
                            ))}
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Task Name
                        </Typography>
                        <Typography className="capitalize">
                            {data.task_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Level
                        </Typography>
                        <Typography>{data.level}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Status
                        </Typography>
                        {isEdit ?
                            (
                            <Box component={"form"} onSubmit={statusSubmit}>
                                <Select
                                    value={state.status}
                                    name="status"
                                    style={{ height: "42px" }}
                                    size="small"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1  "
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value={"new"} disabled={(data.status=='started' || data.status == 'complete' || data.status == 'pause')?true:false}>New</MenuItem>
                                    <MenuItem value={"started"} disabled={ data.status == 'complete'?true:false}>Started</MenuItem>
                                    <MenuItem value={"pause"} disabled={ data.status == 'complete'?true:false}>Pause</MenuItem>
                                    <MenuItem value={"complete"}>Complete</MenuItem>
                                </Select>
                                <IconButton color="primary" aria-label="save" onClick={statusSubmit}>
                                    <SaveIcon
                                        color="primary"
                                        sx={{
                                            fontSize: "30px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography className="capitalize">
                                    <Chip
                                        label={state.status}
                                        style={{background:StatusStyle.ChipColor[state.status ].color,color: "white",
                                        }}
                                    />
                                </Typography>
                                {auth.user.user_role !== "hr manager" && (
                                    <IconButton
                                        color="primary"
                                        aria-label="edit"
                                        onClick={handleStatus}
                                    >
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                )}
                            </div>
                        )}
                        { isEdit && data.status == 'complete' ? (<Alert> already Complete </Alert>)
                           : ( isEdit && state.status == "complete" && (
                             <StatusPopup auth={auth} Id={data.id} statusSubmit={statusSubmit}  setState = {setState}setIsEdit = {setIsEdit}state={{ status:data.status }}/>
                        ))}

                        { isEdit && state.status === "started" && updated.length == 0 && (
                            <StartTimerPopUp
                                auth={auth}
                                Id={data.id}
                                statusSubmit={statusSubmit}
                                setState = {setState}
                                setIsEdit = {setIsEdit}
                                state={{ status:data.status }}
                            />
                        )}

                        {isEdit && state.status === 'started' && updated .length > 0 && (
                            data.id === updated[0].id ? <Alert>This task is Already start </Alert> :
                            <PauseorUpdateTime
                                auth={auth}
                                pauseStatus={pauseStatus}
                                updated= {updated}
                                setState = {setState}
                                setIsEdit = {setIsEdit}
                                state={{ status:data.status }}
                            />
                        )}
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Assign Date</Typography>
                        <Typography className="capitalize"><FormatDate date={data.start_date} /></Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Created At</Typography>
                        <Typography className="capitalize"><DateTimeFormat date={data.created_at} /> </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Start Date</Typography>
                        <Typography className="capitalize">{data.started_at && <FormatDate date={data.started_at} />}</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Working Hour</Typography>
                        <Typography className="capitalize">{data.hour_worked}</Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                        <Typography className="capitalize">{data.description} </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    flexGrow: 10,
                    margin: "2%",
                    background: "#f9f9f9",
                    boxShadow: "2px 2px 2px 2px #e3e1da",
                    padding: "40px",
                }}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            height: "50px",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                            Developers
                        </Typography>
                    </Grid>
                </Grid>

                <br />

                <Box>
                    {developer.map(
                        (item, j) => {
                            return (
                                dev.map((id_dev,i)=>{
                                    return (
                                        id_dev == item.id &&
                                        <Tooltip title={item.user_role}>
                                            <Chip label={item.name} key={j} className="capitalize" sx={{ margin:"10px"}}
                                                color={item.user_role == "project manager" ? "success" : "primary"}/>
                                        </Tooltip>);
                                })

                            );

                        }
                    )}
                </Box>
            </Box>
        </>
    );
}
