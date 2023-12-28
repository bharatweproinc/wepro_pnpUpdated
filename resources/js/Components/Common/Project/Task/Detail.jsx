import React from "react";
import { Tab } from "@mui/material";
import TaskDetail from "./TaskDetail";
import TaskBugs from "./TaskBugs";
import TaskResult from "./TaskResult";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function Detail({ data, developer, auth, devId, updated }) {


    const [value, setValue] = React.useState("1");

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const dev_id = data.developer_id.split(",");



    return (
        <>
            <TabContext value={value}>
                <TabList onChange={handleChangeTab} className="px-3">
                    <Tab label="Details" value="1" style={{ fontWeight:"bold"}}/>
                    <Tab label="Bugs" value="2" style={{ fontWeight:"bold"}}/>
                    <Tab label="Result" value="3" style={{ fontWeight:"bold"}}/>
                </TabList>

                <TabPanel value="1">
                    <TaskDetail auth={auth} data={data} developer={developer} />
                </TabPanel>
                <TabPanel value="2">
                    <TaskBugs />
                </TabPanel>
                <TabPanel value="3">
                    <TaskResult />
                </TabPanel>
            </TabContext>
            {/* <Box
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
                        <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>Task Information </Typography>
                        {auth.user.user_role !== "hr manager" ||
                            auth.user.user_role !== "junior developer" ||
                            (auth.user.user_role !== "senior developer" && (
                                <Edit
                                    devId={dev.id}
                                    developer={developer}
                                    data={data}
                                    auth={auth}
                                    sx={{ display: "flex",justifyContent: "end", }}
                                />
                            ))}
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}> Task Name </Typography>
                        <Typography className="capitalize"> {data.task_name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}> Level</Typography>
                        <Typography>{data.level}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
                        {isEdit ?
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
                         : (
                            <div style={{display: "flex",alignItems: "center",}}>
                                <Typography className="capitalize">
                                    <Chip label={state.status} style={{background:StatusStyle.ChipColor[state.status ].color,color: "white",}}/>
                                </Typography>
                                {auth.user.user_role !== "hr manager" && (
                                    <IconButton
                                        color="primary"
                                        aria-label="edit"
                                        onClick={handleStatus}
                                    >
                                        <EditIcon/>
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
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>Working Hour</Typography>
                        <Typography className="capitalize">{data.hour_worked} Minutes</Typography>
                    </Grid>
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
                    <Grid item xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            height: "50px",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}> Developers</Typography>
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
                             }) );
                        }
                    )}
                </Box>
            </Box> */}
        </>
    );
}
