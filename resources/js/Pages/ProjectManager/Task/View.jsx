import CssBaseline from "@mui/material/CssBaseline";
import {
    Alert, Box, Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Create from "@/Components/Common/Project/Task/Create";
import List from "@/Components/Common/Project/Task/List";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';


export default function View({  auth,data, Id, developer,status ,bugs,result ,taskHistory}) {

    return (
       <>
                {data.length === 0 ? (
                    <>
                        <div className="py-1">
                            <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <Alert
                                        severity="info"
                                        className="capitalize"
                                        style={{
                                            '& .severity': {
                                                MarginTop: '9px',
                                              },
                                         }}
                                         action={
                                            <Create developer={developer} Id={Id} auth={auth}/>
                                          }
                                    >
                                        No task found for this project ,you can
                                        Create a new task!
                                    </Alert>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                        <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                        <Typography sx={{color:"#000000",paddingBottom:"5px"}}>No Project Found yet!</Typography>
                                        <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! you are not assign on any Project.</Typography>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                  <List auth={auth} data={data} Id={Id} developer={developer} updated={status} bugs={bugs} result={result} history={taskHistory}/>
                )}
                </>
    );
}
