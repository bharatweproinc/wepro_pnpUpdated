import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Grid, Typography } from '@mui/material';

export default function View({ data,auth }) {
    console.log(data,'data');
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <Box sx={{ backgroundColor: "#f7f7f7",borderRadius:'10px'}} className="pb-5">
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
                                       Account Information
                                    </Typography>

                                </Grid>
                            </Grid>
                            <br />
                            <Grid container className="px-3">
                                <Grid item xs={4}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                         Name
                                    </Typography>
                                    <Typography className="capitalize">{data.name}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                                    <Typography>{data.email}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                      Role
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
                                    <Typography sx={{ fontWeight: "bold",paddingBottom:'10px' }}>Profile Image </Typography>
                                    <img src= {data.profile} alt="Profile Image" style={{ width: '200px', height: '150px' }}/>
                                </Grid>
                            </Grid>
                            </Box>
                         </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
