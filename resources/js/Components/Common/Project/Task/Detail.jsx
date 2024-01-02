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
                    <TaskDetail auth={auth} data={data} developer={developer} updated={updated} />
                </TabPanel>
                <TabPanel value="2">
                    <TaskBugs />
                </TabPanel>
                <TabPanel value="3">
                    <TaskResult />
                </TabPanel>
            </TabContext>
        </>
    );
}
