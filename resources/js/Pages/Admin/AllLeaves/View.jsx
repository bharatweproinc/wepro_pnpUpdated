import List from "@/Components/Common/AllLeaves/List";
import Create from "@/Components/Common/User/Leaves/Create";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Box, Typography,} from "@mui/material";
import { useState } from "react";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';


export default function View({leave ,auth ,user}) {
    const [open ,setOpen] = useState(true);
    return (
        <AuthenticatedLayout user={auth.user}>
            <div  className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { leave.data.length === 0 ?
                                <>
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{"& .severity": {MarginTop: "9px",}}}
                                    action={(auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && ( <Create Id={leave} auth={auth} user={user}/> )}
                                >
                                    Leaves Not Found ! You can create a Leave ...
                                </Alert>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                    <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                    <Typography sx={{color:"#000000",paddingBottom:"5px"}}>No leave Found yet!</Typography>
                                    <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! you don't have any leave.</Typography>
                                </Box>
                                </>
                                :
                                <List leave={leave.data} auth={auth} user={user} open={open}/>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
