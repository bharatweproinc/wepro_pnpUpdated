import { Box, Button, Grid, Typography } from "@mui/material";
import './Style.scss';
import Edit from "./Edit";
import Currency from "@/Util/Currency";

export default function Details({auth,salary ,data}){
    const tax = ( salary?.gross_salary  *  salary?.tax_deducted_at_source) / 100;

    return (
             <Box
               sx={{ backgroundColor: '#f7f7f7',borderRadius:"10px" }} className="pb-5" >
                <Grid container >
                    <Grid item xs={12} style={{
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
                            Salary Information
                        </Typography>
                        { (auth.user.user_role =="admin" || auth.user.user_role =="hr manager") &&
                        <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }}>
                            <Edit salary={salary} auth={auth} userId={data.id}/>
                        </Button>
                        }

                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} className="px-3" style={{ justifyContent:'space-evenly'}}>
                    <Grid item xs={12} sx={{  display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                           Basic Salary
                        </Typography>
                        <Typography  className = "text" style={{ maxWidth:'50%' }}>{Currency.INRFormate( salary?.basic_salary)}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                           Medical And Conveyance
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.medical_and_Conveyance)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                            Leave Travel Allowance
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.leave_travel_allowance)}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                           Statutory Bonus
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.statutory_bonus)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                          Provided Fund
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.provided_fund)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                            House Rent
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.house_rent)}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',borderTop:"1px solid gray"}}>
                        <Typography className="title">
                            Gross Salary
                        </Typography>

                        <Typography  className = "text">
                        {Currency.INRFormate( salary?.gross_salary)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                           Tax Deduction
                        </Typography>

                        <Typography className="text">
                         { salary?.tax_deducted_at_source}% of {Currency.INRFormate( salary?.gross_salary)} = {tax}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-around',borderTop:"1px solid gray"}}>
                        <Typography className="title" >
                           Net Salary
                        </Typography>

                        <Typography  className = "text">
                          Gross Salary - Tax Deduction =  {Currency.INRFormate( salary?.net_salary)}
                        </Typography>
                    </Grid>
                  </Grid>
            </Box>
    );
}
