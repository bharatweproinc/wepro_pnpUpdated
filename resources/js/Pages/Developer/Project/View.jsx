import List from "@/Components/Common/Project/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,

} from "@mui/material";


export default function View({ data, auth, developer, manager  }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { data.data.length === 0 ?
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{ "& .severity": {MarginTop: "9px",},}}
                                >
                                    You Are Not Assign On Any Project !
                                </Alert>
                                :
                                <List data={data} developer={developer} manager={manager} auth={auth}/>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


