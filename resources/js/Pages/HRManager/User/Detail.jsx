import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserDetail from "@/Components/Common/User/UserDetail";
import Details from "@/Components/Common/Salary/Detail";
import View from "../Leave/View";
import History from "@/Components/Common/History";

export default function Detail({ data, auth, salary ,leave ,history}) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        {[
                            <Tab key="1" label="Detail" value="1" style={{ fontWeight:"bold"}} />,
                            data.user_role === "admin" ? (
                                <Tab key="3" label="History" value="3" style={{ fontWeight:"bold"}}/>
                            ) : (
                                [
                                    <Tab key="2" label="Salary" value="2" style={{ fontWeight:"bold"}}/>,
                                    <Tab key="3" label="History" value="3" style={{ fontWeight:"bold"}}/>,
                                    <Tab key="4" label="Leave" value="4" style={{ fontWeight:"bold" }}/>,
                                ] ),
                            ]}
                    </TabList>
                    <TabPanel value="1">
                        <UserDetail data={data} auth={auth}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <Details salary={salary[0]} data={data} auth={auth}/>
                    </TabPanel>
                    <TabPanel value="3">
                        <History data={data} auth={auth} history={history}/>
                    </TabPanel>
                    <TabPanel value="4">
                        <View auth={auth} leave={leave} Id={data.id}/>
                    </TabPanel>
                </TabContext>
            </Box>
        </AuthenticatedLayout>
    );
}
