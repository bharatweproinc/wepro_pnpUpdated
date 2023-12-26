import Box from "@mui/material/Box";
import { Button, Grid, Typography, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@inertiajs/react";
import Edit from "./Edit";

export default function UserDetail({ data ,auth }) {
    const { setData, get, processing, errors, setError } = useForm();
    return (
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
                        Basic Information
                    </Typography>
                    <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }} >
                        <Edit auth={auth} user={data}/>
                    </Button>
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
                    <Typography sx={{ fontWeight: "bold",paddingBottom:'10px' }}>Profile Image </Typography>
                    <img src= {data.profile} alt="Profile Image" style={{ width: '200px', height: '150px' }}/>
                </Grid>
            </Grid>
        </Box>
    );
}
