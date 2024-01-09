import CssBaseline from "@mui/material/CssBaseline";
import {Alert, Box, Typography,} from "@mui/material";
import List from "@/Components/Common/Project/Task/List";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';


export default function View({  auth,data, Id, developer ,updated ,bugs ,result,history}) {

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
                                        No task found for this project ,You Don't have any Task !
                                    </Alert>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                        <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                        <Typography sx={{color:"#000000",paddingBottom:"5px"}}>Task Not Found yet!</Typography>
                                        <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! you don't have any task.</Typography>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                  <List auth={auth} data={data} Id={Id} history={history} developer={developer} updated={updated} bugs={bugs} result={result}/>
                )}
                </>
    );
}
