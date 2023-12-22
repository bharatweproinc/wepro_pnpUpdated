import List from "@/Components/Common/Project/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,

} from "@mui/material";


export default function View({ data, auth, developer, manager }) {
    console.log(data,'datat');
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { data.data.length == 0 ? (
                            <>
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{
                                        "& .severity": {
                                            MarginTop: "9px",
                                        },
                                    }}
                                    // action={<Create
                                    //     developer={developer}
                                    //     manager={manager}
                                    // />}
                                >
                                    Project Not Found !
                                </Alert>
                            </>
                        ) : (
                            <>

                                <List data={data} developer={developer} manager={manager} auth={auth}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


