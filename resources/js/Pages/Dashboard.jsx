import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const role = [
    {
        name:"admin"
    },
    {
        name:"project manager"
    },
]

export default function Dashboard({ auth ,user ,project , leave}) {
    console.log(user.filter((value) => value.user_role=="admin") ,'uweryhew');
    let totalAdmin = user.filter((value) => value.user_role=="admin");
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Total Users</Typography>
                            <Paper elevation={3}>
                                <Box p={"10px 15px"}>
                                    {
                                        user.map((value, index) => {
                                            return<Box key={index} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                {/* <Typography variant="subtitle1">{value.user_role =="admin" ? "admin" : value.user_role =="project manager" ?
                                                "project manager" : value.user_role =="hr manager" ? " hr manager" : value.user_role =="junior developer"&&"junior developer"}</Typography>
                                                <Typography variant="subtitle1">{index}</Typography> */}
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Total Projects</Typography>
                            <Paper elevation={3}>
                                <Box p={"10px 15px"} display={"flex"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Product Manager</Typography>
                                    <Typography variant="subtitle1">4</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Leaves</Typography>
                            <Paper elevation={3}>
                                <Box p={"10px 15px"} display={"flex"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Product Manager</Typography>
                                    <Typography variant="subtitle1">4</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
