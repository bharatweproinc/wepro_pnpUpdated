import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DateTimeFormat from '@/Util/DateTimeFormat';
import { Head } from '@inertiajs/react';
import { Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import LeaveStyle from '@/Components/Common/AllLeaves/Component/LeaveStyle';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

export default function Dashboard({ auth ,user ,project , leave}) {
    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
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
                                    <Typography variant="subtitle1">Number of projects</Typography>
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
                                    : <Box p={"10px 15px"}>
                                    <TableContainer sx={{ padding: "10px", border: "2px solid whitesmoke", background: "rgba(0,0,0,0.02)", }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: "bold" }}>ID </TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }}> Subject </TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }}>Requested Date </TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }}> Status </TableCell>
                                                    <TableCell sx={{ fontWeight: "bold", textAlign: 'right' }}>Action </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {leave.slice( page*rowsPerPage,page*rowsPerPage + rowsPerPage).map((item, j) => {
                                                    return (
                                                        <>
                                                            <TableRow key={j + 1}>
                                                                <TableCell>{item.id}</TableCell>
                                                                <TableCell className="capitalize">{user.map((info)=>{return (  info.id === item.user_id  && info.name)})}</TableCell>
                                                                <TableCell className="capitalize">{item.subject}</TableCell>
                                                                <TableCell>
                                                                    <DateTimeFormat date={item.requested_date}/>
                                                                </TableCell>

                                                                <TableCell className="capitalize">
                                                                <Chip
                                                                    color={LeaveStyle.LeaveReason[item.status]?.color}
                                                                    label={item.status} size="small" onDelete={()=>{}}
                                                                    deleteIcon={LeaveStyle.LeaveReason[item.status]?.icon}
                                                                />

                                                                </TableCell>
                                                                <TableCell sx={{ display:"flex", justifyContent:"end", alignItems:"center" }}>
                                                                    <IconButton aria-label="detail">
                                                                        <VisibilityIcon onClick={() => toggleRow(item.id)}>
                                                                        </VisibilityIcon>
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={6} sx={{py: 0, backgroundColor:"#80808024", px: { xs: "5px",md: "16px",}}}>
                                                                    <Collapse in={expandedRows.includes(item.id)} unmountOnExit>
                                                                        <Grid container spacing={2} py={3}>
                                                                            <Grid item xs={4}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>User Name</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>{user.map((info)=>{return (  info.id === item.user_id  && info.name)})}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={4}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>Requested Date</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>{item.requested_date}</Typography>
                                                                            </Grid>

                                                                            <Grid item xs={4}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>To Date</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>{item.to_date}</Typography>
                                                                            </Grid>

                                                                            <Grid item xs={4}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>Days</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>{item.days}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={4}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>Status</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>
                                                                                    <Chip
                                                                                        color={LeaveStyle.LeaveReason[item.status]?.color}
                                                                                        label={item.status}
                                                                                        size="small"
                                                                                        onDelete={()=>{}}
                                                                                        deleteIcon={LeaveStyle.LeaveReason[item.status]?.icon}
                                                                                    />
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <Typography variant='subtitle2' fontWeight={"bold"}>Description</Typography>
                                                                                <Typography sx={{ textTransform: 'capitalize' }}>{item.description}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <Typography sx={{ fontWeight: "bold",paddingBottom:'5px' }}>Uploaded File</Typography>
                                                                                <Typography className="capitalize">
                                                                                    <img src={item.file} alt="leave file" style={{ width: '200px', height: '150px' }}/>
                                                                                </Typography>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Collapse>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[leave.to]}
                                        component="div"
                                        count={leave.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Box>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
