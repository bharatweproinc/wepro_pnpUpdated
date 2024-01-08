import {
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
import { useForm } from "@inertiajs/react";
import DateTimeFormat from "@/Util/DateTimeFormat";
import Create from "../User/Leaves/Create";
import Edit from "../User/Leaves/Edit";
import Details from "../User/Leaves/Detail";
import LeaveStyle from "./Component/LeaveStyle";
import TextInput from "@/Components/TextInput";
import SearchIcon from '@mui/icons-material/Search';
import { info } from "autoprefixer";

export default function List({ leave, auth, user ,open }) {

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isFilter ,setIsFilter] = useState(true);
    const [search, setSearch] = useState(false);
    const [searchItem,setSearchItem] = useState();
    const [data,setData] = useState(leave);
    const { get, post, processing, errors, reset } = useForm();

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

    const handleSearch = () =>{
        setSearch(true);
        setIsFilter(false);
    }
    const handleClose =() =>{
        setSearchItem("");
        setSearch(false);
        setIsFilter(true);
        setData(leave);
    }
    const handleInputChange =(e) =>{
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filterItem = user.filter((val) => {
            return val.name.toLowerCase().includes(searchTerm.toLowerCase())
          });
        const user_id = filterItem.map((val)=>val.id);
        const searched = leave.filter((leav)=>{ return leav.user_id == user_id});

        setData(searched);
    }


    return (
        <>
            <div style={{ display: "flex", justifyContent: "end", paddingBottom:"10px"}} >
                {isFilter && open &&
                         <Button variant="contained" startIcon={<SearchIcon/>} onClick={handleSearch} sx={{ marginRight:'10px' }}> Filter</Button>
                }
                { search &&
                    <div style={{ display:'flex' ,justifyContent:'end' ,marginRight:"10px", height:'38px'}}>
                         <TextInput
                         id="search"
                         placeholder="Search By Name"
                         value={searchItem}
                         onChange={handleInputChange}
                         style={{ height:'' }}
                         />
                         <Button variant="contained" color="error" onClick={handleClose} style={{ position:"absolute", fontWeight:"bold" ,margin:'2px 2px 0px 0px',height:'33px'}}>x</Button>
                     </div>
                }
               {(auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && open && ( <Create Id={leave} auth={auth} user={user}/> )}

            </div>

            <TableContainer sx={{ padding: "10px", border: "2px solid whitesmoke", background: "rgba(0,0,0,0.02)", }}>
                <Table aria-label="simple table" size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Subject </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Requested Date </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Status </TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: 'right' }}>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice( page * rowsPerPage,page * rowsPerPage + rowsPerPage)
                          .map((item, j) => {
                                return (
                                    <>
                                        <TableRow key={j + 1}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell className="capitalize">{user.map((info)=>{return (info.id == item.user_id  && info.name) })}</TableCell>
                                            <TableCell className="capitalize"> {item.subject}</TableCell>
                                            <TableCell> <DateTimeFormat date={item.requested_date}/> </TableCell>
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
                                                    <VisibilityIcon onClick={() => toggleRow(item.id) } > </VisibilityIcon>
                                                </IconButton>
                                                &emsp;
                                                {
                                                    (auth.user.user_role == "admin" || auth.user.user_role == "hr manager") && (item.status !== 'approved') && open &&
                                                    <Edit item={item} auth={auth} user={user}/>
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                sx={{
                                                    py: 0,
                                                    backgroundColor: "#80808024",
                                                    px: {xs: "5px",md: "16px",},
                                                }}
                                            >
                                                <Collapse
                                                    in={expandedRows.includes(item.id )}
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
