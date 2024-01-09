import { data } from "autoprefixer";
import { Box, Typography ,Grid, TablePagination, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Alert } from "@mui/material";
import DateTimeFormat from "@/Util/DateTimeFormat";
import { useState } from "react";

export default function History({ history}){
    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };
    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };
    return (
        <Box sx={{ flexGrow: 10, background: "#f9f9f9", boxShadow: "2px 2px 2px 2px #e3e1da",}}>
            <Grid container >
                <Grid item xs={12}
                    style={{
                        background: "rgb(236 236 236)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height:"50px",
                    }}
                >
                    <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>History</Typography>
                </Grid>
                <Grid item xs={12} p={"5px"}>

                    <TableContainer sx={{ padding: "10px", border: "2px solid whitesmoke", }}>
                        <Table aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                                    {/* <TableCell sx={{ fontWeight: "bold" }}>Change Type</TableCell> */}
                                    {/* <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Updated At</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.slice( page*rowsPerPage,page*rowsPerPage + rowsPerPage).map((item, j) => {
                                    return (
                                        <>
                                            <TableRow key={j + 1}>
                                                <TableCell style={{width:'40%'}}>{item.description}</TableCell>
                                                <TableCell style={{width:'20%'}}><DateTimeFormat date={item.created_at}/></TableCell>
                                                {/* <TableCell style={{width:'20%'}}>{item.change_type}</TableCell>
                                                <TableCell style={{width:'20%'}} className="capitalize"><DateTimeFormat date={item.created_at}/></TableCell>
                                                <TableCell style={{width:'20%'}}><DateTimeFormat date={item.updated_at}/></TableCell> */}
                                            </TableRow>
                                        </>
                                        );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[history.to]}
                        component="div"
                        count={history.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </Grid>
            </Grid>
         </Box>
    );
}
