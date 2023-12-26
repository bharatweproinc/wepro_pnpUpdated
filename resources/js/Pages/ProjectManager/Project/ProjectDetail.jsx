import Box from "@mui/material/Box";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Details from "@/Components/Common/Project/Details";
import View from "../Task/View";

export default function ProjectDetail({ data, auth, user, task ,status}) {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const url = window.location.pathname;
    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 1];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Box
                sx={{
                    flexGrow: 10,
                    margin: "3%",
                    background: "white",
                    boxShadow: "2px 2px 2px 2px #e3e1da",
                    padding: "40px",
                }}
            >
                <TabContext value={value}>
                    <TabList onChange={handleChange} className="px-3">
                        <Tab label="Details" value="1" style={{ fontWeight:"bold"}}/>
                        <Tab label="Task" value="2" style={{ fontWeight:"bold"}}/>
                    </TabList>
                    <TabPanel value="1">
                       <Details data={data} user={user} auth={auth}/>

                    </TabPanel>

                    <TabPanel value="2">
                        <View data={task} Id={id} developer={user} auth={auth} status={status}/>
                    </TabPanel>

                </TabContext>
            </Box>
        </AuthenticatedLayout>
    );
}


