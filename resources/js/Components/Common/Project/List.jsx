import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "@inertiajs/react";
import FormatDate from "@/Util/FormatDate";
import DateTimeFormat from "@/Util/DateTimeFormat";
import { useState } from "react";
import Create from "@/Pages/Admin/Project/Create";
import RenderStatusChip from "./Components/RenderStatusChip";

export default function List({ data, auth, developer, manager, status,task }) {
   console.log(auth.user.user_role ,task,'auth')
    const { setData, get, processing, errors, setError } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { current_page, total } = data;
    const handleView = (id) => {
        if (auth.user.user_role === "admin") {
            get(route("admin.project.detail", { id }));
        }
        else if (auth.user.user_role === "project manager") {
            get(route('projectManager.project.detail', { id }));
        }
        else if (auth.user.user_role === "hr manager") {
            get(route('hrManager.project.detail', { id }));
        }
        else if (auth.user.user_role === "junior developer" || auth.user.user_role === "senior developer") {
            get(route('developer.project.detail', { id }));
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (data.next_page_url) {
            get(`${data.next_page_url}&page=${newPage + 1}`);
        }
        else {
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
        <>
            <div style={{ paddingBottom: "10px", display: "flex", justifyContent: "end", }}>
                {
                    auth.user.user_role == "admin" &&
                    <Create developer={developer} manager={manager} />
                }
            </div>
            <TableContainer sx={{ padding: "10px", border: "1px solid whitesmoke", }}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                            {/* <TableCell sx={{ fontWeight: "bold" }}> Assign Date</TableCell> */}
                            <TableCell sx={{ fontWeight: "bold" }}> Created Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, j) => {
                                return (
                                    <TableRow key={j + 1}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell className="capitalize">{item.title}</TableCell>
                                        {/* <TableCell><FormatDate date={item.start_date} /></TableCell> */}
                                        <TableCell><DateTimeFormat date={item.created_at} /> </TableCell>
                                        <TableCell className="capitalize"><RenderStatusChip data={task} id ={item.id}/></TableCell>
                                        <TableCell sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                            <IconButton aria-label="detail" sx={{ color: "rgba(0, 0, 0, 0.54)", }} onClick={() => handleView(item.id)}>
                                                <VisibilityIcon/>
                                            </IconButton>
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
                page={current_page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={
                    handleChangeRowsPerPage
                }
            />
        </>
    );
}
