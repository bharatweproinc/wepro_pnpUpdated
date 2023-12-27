import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './Style.scss';
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
    return { id: `simple-tab-${index}`,'aria-controls': `simple-tabpanel-${index}`,};
}

export default function View({ data, auth, salary }) {
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
                                    <Box sx={{ backgroundColor: "#f7f7f7", borderRadius: '10px' }} className="pb-5">
                                        <Grid container >
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
                                                <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                                                    Basic Information
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container className="px-3">
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: "bold" }}>
                                                    User Name
                                                </Typography>
                                                <Typography className="capitalize">{data.name}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                                                <Typography>{data.email}</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: "bold" }}>
                                                    User Role
                                                </Typography>
                                                <Typography className="capitalize">{data.user_role}</Typography>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        <Grid container className="px-3">
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: "bold" }}>Phone </Typography>
                                                <Typography className="capitalize">
                                                    {data.contact_no}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container className="px-3">
                                            <Grid item xs={4}>
                                                <Typography sx={{ fontWeight: "bold", paddingBottom: '10px' }}>Profile Image </Typography>
                                                <img src={data.profile} alt="Profile Image" style={{ width: '200px', height: '150px' }} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Box sx={{ backgroundColor: '#f7f7f7', borderRadius: "10px" }} className="pb-5" >
                                        <Grid container >
                                            <Grid item xs={12} style={{
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
                                                    Salary Information
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container className="px-3" style={{ justifyContent: 'space-evenly' }}>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Basic Salary
                                                </Typography>
                                                <Typography className="text" style={{ maxWidth: '50%' }}>Rs {salary?.basic_salary}</Typography>
                                            </Grid>

                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Medical And Conveyance
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.medical_and_Conveyance}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Leave Travel Allowance
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.leave_travel_allowance}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Statutory Bonus
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.statutory_bonus}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Provided Fund
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.provided_fund}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    House Rent
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.house_rent}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around', borderTop: "1px solid gray" }}>
                                                <Typography className="title">
                                                    Gross Salary
                                                </Typography>

                                                <Typography className="text">
                                                    Rs {salary?.gross_salary}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                                <Typography className="title">
                                                    Tax Deduction
                                                </Typography>

                                                <Typography className="text">
                                                    {salary?.tax_deducted_at_source}% of Rs {salary?.gross_salary} = {tax}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around', borderTop: "1px solid gray" }}>
                                                <Typography className="title" >
                                                    Net Salary
                                                </Typography>

                                                <Typography className="text">
                                                    Gross Salary - Tax Deduction =  Rs {salary?.net_salary}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
