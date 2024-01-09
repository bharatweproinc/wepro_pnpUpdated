import { Alert, Box, Grid, Typography } from '@mui/material';
import React from 'react'

const TaskResult = ({auth ,result,data}) => {
  return (
   <>
    {result.length > 0 ?
    // (auth.user.user_role =="junior developer" || auth.user.user_role == "senior developer") &&
        <Box sx={{ flexGrow: 10, background: "#f9f9f9", boxShadow: "2px 2px 2px 2px #e3e1da", padding: "0px 0px 40px 0px",}}>
                <Grid container>
                        <Grid item xs={12} style={{background: "rgb(236 236 236)",display: "flex",justifyContent: "space-between",alignItems: "center",height: "50px", }}  >
                            <Typography sx={{ fontWeight: "bold",paddingLeft:'20px' }}>Bugs Information </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2} paddingLeft={'20px'}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }} >Task Rating </Typography>
                            <Typography > {data?.level}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }} >Comments</Typography>
                            <Typography className="capitalize" >{result[0].text_cases} </Typography>
                        </Grid>
                    </Grid>
        </Box>
    :
    <Alert severity="info"> This Task is Not complete marked By Developer ... </Alert>
    }
   </>
  )
}
export default TaskResult;
