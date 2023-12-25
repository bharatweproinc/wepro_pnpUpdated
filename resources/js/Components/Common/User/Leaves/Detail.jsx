import FormatDate from "@/Util/FormatDate";
import { useForm, usePage } from "@inertiajs/react";
import {
    Box,
    Grid,
    Typography,
    Chip,
    Alert,
} from "@mui/material";
import LeaveStyle from "../../AllLeaves/Component/LeaveStyle";

export default function Details({ data, auth }) {
    const { setData, get, processing, errors, setError } = useForm();

    return (
        <>
            <Box sx={{ backgroundColor: "#f7f7f7",borderRadius:"10px" }} className="pb-5">
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            height:"50px",
                        }}>
                        <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                            Leave Information
                        </Typography>

                    </Grid>
                </Grid>
                <br />

                <Grid container className="px-3">

                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Requested Date
                        </Typography>
                        <Typography>
                            <FormatDate date={data.requested_date} />
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            To Date
                        </Typography>
                        <Typography className="capitalize">
                           <FormatDate date={data.to_date}/>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Days
                        </Typography>
                        <Typography className="capitalize">
                            {data.days}
                        </Typography>
                    </Grid>

                </Grid>
                <br/>
                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Status
                        </Typography>
                        <Typography className="capitalize">
                            <Chip sx={{backgroundColor:LeaveStyle.LeaveReason[data.status].color}} label={data.status} />
                        </Typography>
                    </Grid>

                {data.status=='denied' &&
                     <Grid item xs={8}>
                     <Typography sx={{ fontWeight: "bold" }}>
                        Reason
                     </Typography>
                     <Typography className="capitalize">
                         <Alert color="error" severity="error">{data.reason} </Alert>
                     </Typography>
                    </Grid>
                }
                </Grid>
                <br />

                <Grid container className="px-3">
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Description
                        </Typography>
                        <Typography className="capitalize">
                            {data.description}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className="pt-3">
                        <Typography sx={{ fontWeight: "bold",paddingBottom:'5px' }}>
                            Uploaded File
                        </Typography>
                        <Typography className="capitalize">
                            {/* <a href={data.file} target="_blank"> */}
                                <img src={data.file} alt="leave file" style={{ maxHeight:'200px' ,maxWidth:'200px' }}/>
                            {/* </a> */}
                        </Typography>
                    </Grid>

                </Grid>

            </Box>
            <br/>



        </>
    );
}
