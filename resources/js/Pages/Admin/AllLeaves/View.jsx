import List from "@/Components/Common/AllLeaves/List";
import Create from "@/Components/Common/User/Leaves/Create";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Alert,} from "@mui/material";
import { useState } from "react";

export default function View({leave ,auth ,user}) {
    const [open ,setOpen] = useState(true);
    return (
        <AuthenticatedLayout user={auth.user}>
            <div  className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { leave.data.length === 0 ?
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{"& .severity": {MarginTop: "9px",}}}
                                    action={(auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && ( <Create Id={leave} auth={auth} user={user}/> )}
                                >
                                    Leaves Not Found ! You can create a Leave ...
                                </Alert>
                                :
                                <List leave={leave.data} auth={auth} user={user} open={open}/>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
