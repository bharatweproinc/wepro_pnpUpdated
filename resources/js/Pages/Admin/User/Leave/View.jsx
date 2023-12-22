
import Create from "@/Components/Common/User/Leaves/Create";
import List from "@/Components/Common/User/Leaves/List";
import {Alert} from "@mui/material";


export default function View({auth,leave ,Id }) {

     return (
       <>
               {leave.length === 0 ? (
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
                                            <Create auth={auth} Id={Id} user={[]}/>
                                          }
                                    >
                                      Don't have Leave record
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <List data={leave} auth={auth} />
                )}

                </>

    );
}
