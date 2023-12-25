import {
    Chip,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "@inertiajs/react";
import DateTimeFormat from "@/Util/DateTimeFormat";
import Create from "../User/Leaves/Create";
import Edit from "../User/Leaves/Edit";
import Details from "../User/Leaves/Detail";
import LeaveStyle from "./Component/LeaveStyle";

export default function List({ leave, auth, user}) {

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { item, setItem, get, post, processing, errors, reset } = useForm();

    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "end", paddingBottom:"10px"}} >
                {(auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && ( <Create Id={leave} auth={auth} user={user}/> )}
            </div>

            <TableContainer sx={{ padding: "10px", border: "2px solid whitesmoke", background: "rgba(0,0,0,0.02)", }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>User ID </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Subject </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Requested Date </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Status </TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'right' }}>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leave.slice( page * rowsPerPage,page * rowsPerPage + rowsPerPage)
                          .map((item, j) => {
                                return (
                                    <>
                                        <TableRow key={j + 1}>
                                            <TableCell>{item.user_id}</TableCell>
                                            <TableCell className="capitalize">
                                                {item.subject}
                                            </TableCell>
                                            <TableCell>
                                                <DateTimeFormat date={item.requested_date}/>
                                            </TableCell>

                                            <TableCell className="capitalize">
                                            <Chip
                                                color={LeaveStyle.LeaveReason[item.status]?.color}
                                                label={item.status}
                                                size="small"
                                                onDelete={()=>{}}
                                                deleteIcon={LeaveStyle.LeaveReason[item.status]?.icon}
                                            />

                                            </TableCell>
                                            <TableCell sx={{ display:"flex", justifyContent:"end", alignItems:"center" }}>
                                                <IconButton aria-label="detail">
                                                    <VisibilityIcon
                                                        onClick={() => toggleRow(item.id) }
                                                    >
                                                    </VisibilityIcon>
                                                </IconButton>
                                                &emsp;
                                                {
                                                    (auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && (item.status !== 'approved') &&
                                                    <Edit item={item} auth={auth}/>
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                sx={{
                                                    py: 0,
                                                    backgroundColor:
                                                        "#80808024",
                                                    px: {
                                                        xs: "5px",
                                                        md: "16px",
                                                    },
                                                }}
                                            >
                                                <Collapse
                                                    in={expandedRows.includes(
                                                        item.id
                                                    )}
                                                    unmountOnExit
                                                >
                                                    <Details data={item} auth={auth} />
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[leave.to]}
                component="div"
                count={leave.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
