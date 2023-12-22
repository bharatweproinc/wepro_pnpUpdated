import { Box, Button, Grid, Typography } from "@mui/material";
import './Style.scss';
import Edit from "./Edit";

export default function Details({auth,salary ,data}){
    const tax = (salary[0]?.gross_salary  * salary[0]?.tax_deducted_at_source) / 100;

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
                            Salary Information
                        </Typography>
                     <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }}>
                        <Edit salary={salary} auth={auth} userId={data.id}/>
                     </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="px-3" style={{ justifyContent:'space-evenly'}}>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                           Basic Salary
                        </Typography>
                        <Typography  className = "text" style={{ maxWidth:'50%' }}>Rs {salary[0]?.basic_salary}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                           Medical And Conveyance
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.medical_and_Conveyance}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                            Leave Travel Allowance
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.leave_travel_allowance}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                           Statutory Bonus
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.statutory_bonus}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                          Provided Fund
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.provided_fund}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography className="title">
                            House Rent
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.house_rent}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around',borderTop:"1px solid gray"}}>
                        <Typography className="title">
                            Gross Salary
                        </Typography>

                        <Typography  className = "text">
                        Rs {salary[0]?.gross_salary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around'}}>
                        <Typography  className="title">
                           Tax Deduction
                        </Typography>

                        <Typography className="text">
                         {salary[0]?.tax_deducted_at_source}% of Rs {salary[0]?.gross_salary} = {tax}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop:'10px' ,display:'flex',justifyContent:'space-around',borderTop:"1px solid gray"}}>
                        <Typography className="title" >
                           Net Salary
                        </Typography>

                        <Typography  className = "text">
                          Gross Salary - Tax Deduction =  Rs {salary[0]?.net_salary}
                        </Typography>
                    </Grid>
                  </Grid>
            </Box>
    );
}
