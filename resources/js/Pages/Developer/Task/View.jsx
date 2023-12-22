import {Alert,} from "@mui/material";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import List from "@/Components/Common/Project/Task/List";

export default function View({  auth,data, Id, developer ,updated}) {


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
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                  <List auth={auth} data={data} Id={Id} developer={developer} updated={updated}/>
                )}
                </>
    );
}
