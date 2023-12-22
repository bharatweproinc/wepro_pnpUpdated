import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useState } from "react";
import Create from "@/Components/Common/User/Create";
import Edit from "@/Components/Common/User/Edit";
import DeletePopup from "@/Components/Common/User/Components/DeletePopup";
import GlobalStyle from "@/Components/Common/User/Components/GlobalStyle";

export default function View({data, auth }) {

    const {url} = usePage();
    const {  setData, get, processing, errors, setError } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { current_page, last_page, total } = data;
        const handleView =(id) =>{
            {
                if(auth.user.user_role=="admin"){
                    get(route("admin.user.detail", {id}));
                }
                else if(auth.user.user_role == "hr manager")
                {
                    get(route("hrManager.user.detail", {id}));
                }

            }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // get(data.next_page_url) ;
        if (data.next_page_url) {
            get(`${data.next_page_url}&page=${newPage + 1}`);
        }
        else
        {
            get(data.prev_page_url);
        }
      };

      const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        get(`${data.path}?page=1&per_page=${newRowsPerPage}`);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                            <div><PeopleIcon/> Users</div>

                            <div
                            style={{
                                margin: "10px",
                                display: "flex",
                                justifyContent: "end",
                            }}
                        >
                            <Create auth={auth}/>

                        </div>
                        </Box>
                        <TableContainer
                         sx={{ padding:"10px",border:"1px solid whitesmoke" }}>
                            <Table
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Role</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, j) => {
                                        return (
                                            <TableRow key={j + 1}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell className="capitalize">{item.name}</TableCell>
                                                <TableCell> {item.email}</TableCell>
                                                <TableCell>
                                                    <Chip label={item.user_role.replace('_'," ")}
                                                    sx={{ textTransform:"capitalize",backgroundColor:GlobalStyle.ChipColor[item.user_role].color,color:"white" }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                <IconButton aria-label="detail" onClick={()=>handleView(item.id)}>
                                                   <VisibilityIcon sx={{color:"rgba(0, 0, 0, 0.54)"}} />
                                                </IconButton>
                                                      <Edit auth={auth} user={item}/>
                                                        &emsp;
                                                        <DeletePopup auth={auth} id={item.id} user={item}/>
                                                </TableCell>
                                            </TableRow>
                                        );
                                           })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[data.to]}
                            component="div"
                            count={total}
                            rowsPerPage={rowsPerPage}
                            page={current_page-1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
