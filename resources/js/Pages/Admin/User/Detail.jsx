import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserDetail from "@/Components/Common/User/UserDetail";
import View from "./Leave/View";
import Details from "@/Components/Common/Salary/Detail";
import History from "@/Components/Common/History";

export default function Detail({ data, auth, salary ,leave ,history }) {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
           <div className="py-12 users-container">
               <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        <Box>
                            <TabContext value={value}>
                                <TabList onChange={handleChange} className="px-3">
                                {[
                                        <Tab key="1" label="Detail" value="1" style={{ fontWeight:"bold"}} />,
                                        data.user_role === "admin" ? (
                                            <Tab key="3" label="History" value="2" style={{ fontWeight:"bold"}}/>
                                        ) : (
                                            [
                                                <Tab key="2" label="History" value="2" style={{ fontWeight:"bold"}}/>,
                                                <Tab key="3" label="Salary" value="3" style={{ fontWeight:"bold"}}/>,
                                                <Tab key='4' label="Leave" value="4" style={{ fontWeight:"bold"}}/>
                                            ]

                                        ),
                                    ]}

                                </TabList>
                                <TabPanel value="1">
                                    <UserDetail data={data} auth={auth}/>
                                </TabPanel>
                                <TabPanel value="2">
                                    <History data={data} auth={auth} history={history}/>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Details salary={salary} data={data} auth={auth}/>
                                </TabPanel>
                                <TabPanel value="4">
                                    <View auth={auth} leave={leave} Id={data.id}/>
                                </TabPanel>

                            </TabContext>
                        </Box>
                    </div>
               </div>
           </div>
        </AuthenticatedLayout>
    );
}
