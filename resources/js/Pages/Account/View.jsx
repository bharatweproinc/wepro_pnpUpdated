import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './Style.scss';
import Details from '@/Components/Common/Salary/Detail';
import UserDetail from '@/Components/Common/User/UserDetail';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function View({ data, auth, salary ,address ,states}) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => { setValue(newValue) };
    const tax = (salary?.gross_salary * salary?.tax_deducted_at_source) / 100;
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Box>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Detail" {...a11yProps(0)} style={{ fontWeight: "bold" }} />
                                        <Tab label="Salary" {...a11yProps(1)} style={{ fontWeight: "bold" }} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <UserDetail data={data} auth={auth} address={address} states={states}/>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Details auth={auth} salary={salary}/>
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
