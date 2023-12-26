import List from "@/Components/Common/User/Leaves/List";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Alert,} from "@mui/material";

export default function View({ leave ,auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div  className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { leave.data.length === 0 ? (
                            <>
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{
                                        "& .severity": {
                                            MarginTop: "9px",
                                        },
                                    }}
                                >
                                   You don't apply for any  Leaves
                                </Alert>
                            </>
                        ) : (
                            <>
                            <List data={leave.data} auth={auth} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
