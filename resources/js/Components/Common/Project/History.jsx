import { Box, Typography ,Grid } from "@mui/material";
import DateTimeFormat from "@/Util/DateTimeFormat";

export default function History({data})
{
    return (
        <Box
        sx={{ backgroundColor: '#f7f7f7',borderRadius:"10px" }} className="pb-5" >
         <Grid container >
             <Grid
                 item
                 xs={12}
                 style={{
                     background: "rgb(236 236 236)",
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     height:"50px",

                 }}
             >
                 <Typography
                     sx={{ fontWeight: "bold", marginLeft: "10px" }}
                 >
                     History
                 </Typography>
             </Grid>
         </Grid>
         <br />
         <Grid container className="px-3">
             <Grid item xs={4}>
                 <Typography sx={{ fontWeight: "bold" }}>
                    Description
                 </Typography>
                 <Typography className="capitalize">
                    {data.description}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
                 <Typography sx={{ fontWeight: "bold" }}>
                     Created At
                 </Typography>
                 <Typography className="capitalize">
                    <DateTimeFormat date= {data.created_at} />
                 </Typography>
             </Grid>
             <Grid item xs={4}>
                 <Typography sx={{ fontWeight: "bold" }}>
                    Updated At
                 </Typography>
                 <Typography>
                    <DateTimeFormat date={data.updated_at}/>
                 </Typography>
             </Grid>

         </Grid>
         <br />
         <Grid container className="px-3">
         </Grid>
         </Box>
    );
}
