import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DateTimeFormat from '@/Util/DateTimeFormat';
import { Head } from '@inertiajs/react';
import { Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import LeaveStyle from '@/Components/Common/AllLeaves/Component/LeaveStyle';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import FormatDate from '@/Util/FormatDate';
import List from '@/Components/Common/AllLeaves/List';

export default function Dashboard({ auth ,user ,project , leave}) {
    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [open ,setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const userRoles = ["admin", "project manager", "senior developer", "junior developer", "hr manager"];
    const TotalUser = userRoles.map((role, id) => ({
        id: id + 1,
        name: role.charAt(0).toUpperCase() + role.slice(1),
        number: user.filter(value => value.user_role === role).length
    }));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };
    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Total Users</Typography>
                            <Paper elevation={3}>
                                <Box p={"10px 15px"}>
                                    {
                                        TotalUser.map((value) => {
                                            return<Box key={value.id} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography variant="subtitle1">{value.name}</Typography>
                                                <Typography variant="subtitle1">{value.number}</Typography>
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Total Projects</Typography>
                            <Paper elevation={3}>
                                <Box p={"10px 15px"} display={"flex"} justifyContent={"space-between"}>
                                    <Typography variant="subtitle1">Number of Projects</Typography>
                                    <Typography variant="subtitle1">{project.length}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" className='rounded-t-md bg-[#1565c0] text-white p-1 text-center'>Today Leaves</Typography>
                            <Paper elevation={3}>
                                {leave.length<=0 ?
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                        <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                        <Typography sx={{color:"#000000",paddingBottom:"5px"}}>No Leave Found yet!</Typography>
                                        <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! you don't have any leave.</Typography>
                                    </Box>
                                    : <List leave={leave} auth={auth} user={user} open={open} setOpen={setOpen}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
