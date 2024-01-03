import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import View from "../Task/View";
import Details from "@/Components/Common/Project/Details";
import History from "@/Components/Common/History";

export default function Detail({ data, auth, user, task ,updated ,history ,bugs}) {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const url = window.location.pathname;
    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 1];

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Box>
                                <TabContext value={value}>
                                    <TabList onChange={handleChange} className="px-3">
                                        <Tab label="Details" value="1" style={{ fontWeight:"bold"}}/>
                                        <Tab label="History" value="2" style={{ fontWeight:"bold"}}/>
                                        <Tab label="Task" value="3" style={{ fontWeight:"bold"}}/>
                                    </TabList>

                                    <TabPanel value="1">
                                        <Details data={data} user={user} auth={auth} updated={updated}/>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <History data={data} auth={auth} history={history}/>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <View data={task} Id={id} developer={user} auth={auth} updated={updated} bugs={bugs}/>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
