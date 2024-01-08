import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@inertiajs/react";
import Edit from "./Edit";

export default function UserDetail({ data ,auth ,states ,address}) {
    const stateName =  states?.filter((state)=>state.id==address?.state);
    const CityName = stateName[0]?.cities.filter((city)=>city.id==address?.city);
    console.log(CityName,'states');
    return (
        <Box sx={{ backgroundColor: "#f7f7f7",borderRadius:'10px'}} className="pb-5">
            <Grid container>
                <Grid item xs={12} style={{ background: "rgb(236 236 236)", display: "flex", justifyContent: "space-between", alignItems: "center", height: "50px", }} >
                    <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                        Basic Information
                    </Typography>
                    {
                        (auth.user.user_role =="admin" || auth.user.user_role =="hr manager") &&
                        <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }} >
                            <Edit auth={auth} user={data} states={states} address={address}/>
                        </Button>
                    }
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2} className="px-3">
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

                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Phone </Typography>
                    <Typography className="capitalize">
                        {data.contact_no}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Alternative Phone No. </Typography>
                    <Typography className="capitalize">
                        {data.alt_phone_no}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>State</Typography>
                    <Typography className="capitalize">
                        {stateName[0]?.state_name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>City</Typography>
                    <Typography className="capitalize">
                        {CityName?.cities}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Local Address</Typography>
                    <Typography className="capitalize">
                        {address?.local_address}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold" }}>Residential Address</Typography>
                    <Typography className="capitalize">
                        {address?.residential_address}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography sx={{ fontWeight: "bold",paddingBottom:'10px' }}>Profile Image </Typography>
                    <a href={data.profile} target='_blank'>
                        <img src={data.profile} alt="Profile Image" style={{ width: '200px', height: '150px' }} />
                    </a>
                   </Grid>
            </Grid>
        </Box>
    );
}
