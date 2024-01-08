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
import DateTimeFormat from "@/Util/DateTimeFormat";
import Detail from "./Detail";
import Create from "./Create";
import Edit from "./Edit";
import SearchIcon from '@mui/icons-material/Search';
import StatusStyle from "../Components/StatusStyle";
import Filter from "./Filter";
import { useEffect } from "react";
import Validation_Schema from "./ValidationSchema";
import Joi from "@/Util/JoiValidator";
import axios from "axios";
import TextInput from "@/Components/TextInput";


export default function List({ auth, developer, Id, data ,updated ,bugs ,result ,history}) {

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [filter ,setFilter] = useState(true);
    const [isFilter, setIsFilter] = useState(false);
    const [taskData ,setTaskData] = useState(data);
    const [fromDate,setFrom] = useState(null);
    const [ToDate,SetToDate] = useState(null);
    const [fetch ,setFetch] = useState(false);
    const [apply,setApply] = useState(false);
    const [searchItem ,setSearchItem] = useState();
    const [search ,setSearch] = useState(false);
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
        setRowsPerPage(event.target.value, 15);
        setPage(0);
    };
    const handleFilter = () => {
        setIsFilter(true);
      }
    useEffect(()=>{
        setTaskData(data);
    },[data]);
    useEffect(()=>{
        handleApplyFilter;
    },[fetch]);
    const handleApplyFilter = async (filterData) => {
        try {
            // const err = Joi.validateToPlainErrors(filterData,Validation_Schema.APPLY_FILTER)
            // setFrom(filterData?.from_date)
            // SetToDate(filterData?.to_date)
            // setError(err)
            //     if (Joi.hasPlainError(err)) {
            //         return;
            //     }
            {auth.user.user_role == "admin" ?
            await axios.post(route('admin.project.task.filter', { id:Id }), filterData)
            .then((response)=>{
                const filterTaskData = response.data;
                setTaskData(filterTaskData);
                setApply(true);
            }).catch(error => {
                console.error(error);
              })
            :
            auth.user.user_role == "project manager" &&
            await axios.post(route('projectManager.project.task.filter', { id:Id }), filterData)
            .then((response)=>{
                const filterTaskData = response.data;
                setTaskData(filterTaskData);
                setApply(true);

            }).catch(error => {
                console.error(error);
            })
            setFetch(true);
        }
    } catch (error){
        console.error(error);
    }}

    const handleReset =()=>{
        setTaskData(data);
        setApply(false);
        setIsFilter(false);
    }

    const handleSearch = () =>{
        setSearch(true);
        setFilter(false);
    }
    const handleClose =() =>{
        setSearch(false);
        setFilter(true);
        setTaskData(data);
    }
    const handleInputChange =(e) =>{
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filterItem = data.filter((val)=>
            val.task_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTaskData(filterItem);
    }

    return (
        <>
            <div style={{display:'flex' ,justifyContent:'end',paddingBottom:'10px'}}>
                    {(auth.user.user_role === "admin" || auth.user.user_role == "project manager")  &&
                       ( <Box sx={{ display:'flex' ,gap:'15px', display: "flex", justifyContent:"flex-end"}}>
                       <Filter isFilter={isFilter} ApplyFilter={handleApplyFilter} handleFilter={handleFilter} developer={developer} Id={Id} auth={auth} apply={apply} handleReset={handleReset}/>
                        </Box>
                        )
                    }
                    { (auth.user.user_role=="junior developer"||auth.user.user_role=="senior developer") && filter &&
                              <Button variant="contained" startIcon={<SearchIcon/>} onClick={handleSearch} sx={{ marginRight:'10px',width:'120px' }}> Filter</Button>
                     }
                    {(auth.user.user_role=="junior developer"||auth.user.user_role=="senior developer") &&  search &&
                         <div style={{ display:'flex' ,justifyContent:'end' ,marginRight:"10px", height:'38px'}}>
                              <TextInput
                              id="search"
                              placeholder="Type To search"
                              value={searchItem}
                              onChange={handleInputChange}
                              style={{ height:'' }}
                              />
                             <Button variant="contained" color="error" onClick={handleClose} style={{ position:"absolute", fontWeight:"bold" ,margin:'2px 2px 0px 0px',height:'33px'}}>x</Button>
                        </div>

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
                        {taskData?.slice( page*rowsPerPage,page*rowsPerPage + rowsPerPage)
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
                                                        bugs={bugs.filter((image)=>image.imageable_id == item.id)}
                                                        result={result.filter((res)=>res.imageable_id == item.id)}
                                                        history={history.filter((his)=>his.historable_id == item.id)}
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
                rowsPerPageOptions={[15, 25, 35, 45, 50]}
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
