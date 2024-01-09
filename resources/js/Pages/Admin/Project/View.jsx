import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Box, Typography,} from "@mui/material";
import Create from "./Create";
import List from "@/Components/Common/Project/List";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';


export default function View({ data, auth, developer, manager,task }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <div  className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { data.data.length === 0 ?
                                <>
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{ "& .severity": {MarginTop: "9px", },}}
                                    action={<Create developer={developer} manager={manager}/>}
                                >
                                    Project Not Found ! Create A New Project
                                </Alert>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'50vh'}>
                                    <FindInPageOutlinedIcon sx={{ width:128, height:128, color:"#919191"}} />
                                    <Typography sx={{color:"#000000",paddingBottom:"5px"}}>Project Not Found yet!</Typography>
                                    <Typography sx={{color:"#000000",paddingBottom:"15px"}} variant="subtitle2">Opps! you don't have any Project.</Typography>
                                </Box>
                                </>
                         :
                                <List  data={data} developer={developer} manager={manager} auth={auth} task={task}/>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
