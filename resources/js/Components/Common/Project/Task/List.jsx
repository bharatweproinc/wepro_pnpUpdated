import {
    Box,
    Button,
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
import { router, useForm } from "@inertiajs/react";
import DateTimeFormat from "@/Util/DateTimeFormat";
import Detail from "./Detail";
import Create from "./Create";
import Edit from "./Edit";
import StatusStyle from "../Components/StatusStyle";
import Filter from "./Filter";
import { useEffect } from "react";
import axios from "axios";
import Validation_Schema from "./ValidationSchema";
import Joi from "@/Util/JoiValidator";

export default function List({ auth, developer, Id, data ,updated}) {

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isFilter, setIsFilter] = useState(false);
    const [taskData ,setTaskData] = useState(data);
   const [fromDate,setFrom] = useState(null);
   const [ToDate,SetToDate] = useState(null);

   const date1 = new Date(fromDate);
   const date2 = new Date(ToDate);
   const diffTime = Math.abs(date2 - date1);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
        setRowsPerPage(event.target.value, 5);
        setPage(0);
    };
    const handleFilter = () => {
        setIsFilter(true);
      }


    const handleApplyFilter = async (filterData,errors,setError) => {
        try {
            const err = Joi.validateToPlainErrors(filterData,Validation_Schema.APPLY_FILTER)
            setFrom(filterData?.from_date)
            SetToDate(filterData?.to_date)
            setError(err)
                if (Joi.hasPlainError(err)) {
                    return;
                }
          const response = await axios.post(route('admin.project.task.filter', { id:Id }), filterData)
            const filterTaskData = response.data;
            setTaskData(filterTaskData);
            console.log(filterTaskData, 'data after POST request');

        } catch (error) {
            console.error('Axios error:', error);
        }
      };

    return (
        <>
            <div style={{paddingBottom:'10px'}} >
                    {(auth.user.user_role === "admin" || auth.user.user_role == "project manager")  &&

                        <Box sx={{ display:'flex' ,gap:'15px', display: "flex", justifyContent:"flex-end"}}>
                                <Filter isFilter={isFilter} ApplyFilter={handleApplyFilter} handleFilter={handleFilter} developer={developer} Id={Id} auth={auth} />
                        </Box>
                    }
            </div>

            <TableContainer  sx={{ padding: "10px", border: "2px solid whitesmoke", background: "rgba(0,0,0,0.02)", }}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Name </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Start Date </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Status </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskData?.slice( page * rowsPerPage,page * rowsPerPage + rowsPerPage)
                          .map((item, j) => {
                                return (
                                    <>
                                        <TableRow key={j + 1}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell sx={{ textTransform: "capitalize" }}>{item.task_name}</TableCell>
                                            <TableCell> <DateTimeFormat date={item.start_date}/> </TableCell>
                                            <TableCell>{item.priority}</TableCell>
                                            <TableCell sx={{ textTransform: "capitalize" }}>
                                                <Chip label={item.status} sx={{backgroundColor:StatusStyle.ChipColor[item.status].color,color: "white",}}/>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="detail">
                                                    <VisibilityIcon onClick={() => toggleRow(item.id)} sx={{ color: "rgba(0, 0, 0, 0.54)",}}/>
                                                </IconButton>
                                                &emsp;
                                                { (auth.user.user_role == "admin" || auth.user.user_role == "project manager") &&
                                                    <Edit
                                                            devId={item.developer_id}
                                                            developer={developer }
                                                            data={item}
                                                            auth={auth}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={6} sx={{ py: 0, backgroundColor:"#80808024",px: {xs: "5px", md: "16px",}}}>
                                                <Collapse in={expandedRows.includes(item.id)}  unmountOnExit>
                                                    <Detail
                                                        data={item}
                                                        developer={developer}
                                                        auth={auth}
                                                        devId={item.developer_id}
                                                        updated={updated}
                                                          />
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
                rowsPerPageOptions={[5, 15, 25, 35, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
