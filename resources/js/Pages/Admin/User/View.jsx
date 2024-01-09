import CssBaseline from "@mui/material/CssBaseline";
import {
    Alert, Box, Typography,

} from "@mui/material";

import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import List from "@/Components/Common/User/List";


export default function View({data, auth ,states}) {
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

                                    >
                                        No user found .
                                    </Alert>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                        <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                        <Typography sx={{color:"#000000",paddingBottom:"5px"}}>user Not Found yet!</Typography>
                                        <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! no user.</Typography>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                  <List auth={auth} data={data} states={states}/>
                )}
                </>
    );
}
