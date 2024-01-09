import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
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
import './style.scss'
import DeletePopup from "@/Components/Common/User/Components/DeletePopup";
import GlobalStyle from "@/Components/Common/User/Components/GlobalStyle";
import SearchIcon from '@mui/icons-material/Search';
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";

export default function List({data, auth ,states}) {
    const {url} = usePage();
    const { get, processing, errors, setError } = useForm();
    const [page, setPage] = useState(0);
    const [searchItem ,setSearchItem] = useState();
    const [search ,setSearch] = useState(false);
    const [isFilter ,setIsFilter] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [item,setItem] = useState(data.data);
    const { current_page, last_page, total } = data;
    const handleView =(id) =>{
        get(route("admin.user.detail", {id}));
    }

    useEffect(()=>{
        setItem(data.data);
    },[data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (data.next_page_url) {
            get(`${data.next_page_url}&page=${newPage + 1}`);
        }
        else
        {
            get(data.prev_page_url);
        }
      };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = data.to;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        get(`${data.path}?page=1&per_page=${newRowsPerPage}`);
    };
    const handleSearch = () =>{
        setSearch(true);
        setIsFilter(false);
    }
    const handleClose =() =>{
        setItem(data.data);
        setSearchItem("");
        setSearch(false);
        setIsFilter(true);
    }
    const handleInputChange =(e) =>{
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filterItem = data.data.filter((val)=>
            val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setItem(filterItem);
    }
    // const handleSubmit =async ()=>{
    //     setSearch("true");
    //    await axios.get(route("admin.user.filter"),searchItem)
    //    .then((response)=>{
    //     const filterData = response.data;
    //     console.log(response,filterData,'filterrr');
    //     setItem(filterData);
    // });
    //     isReset(true);
    //     setIsFilter(true);
    // }

    return (
        <AuthenticatedLayout user={auth.user} >
            <div className="py-12 users-container" >
                <div className="max-w-7xl mx-auto px-16">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                            <div className="users"><PeopleIcon/> Users</div>
                            <div style={{ margin: "10px", display: "flex", justifyContent: "end",}}>
                                {isFilter &&
                                    <Button variant="contained" startIcon={<SearchIcon/>} onClick={handleSearch} sx={{ marginRight:'10px',width:'120px' }}> Filter</Button>
                                }
                                { search &&
                                    <div style={{ display:'flex' ,justifyContent:'end' ,marginRight:"10px", height:'36px'}}>
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
                                <Create auth={auth} states={states}/>
                            </div>
                        </Box>

                        <TableContainer
                         sx={{ padding:"10px",border:"1px solid whitesmoke" }}>
                            <Table aria-label="simple table" size="small" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Role</TableCell>
                                        <TableCell style={{fontWeight:"bold", paddingLeft:"24px"}}>Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, j) => {
                                        return (
                                            <TableRow key={j + 1}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell className="capitalize">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={item.user_role.replace('_'," ")}
                                                    sx={{ textTransform:"capitalize",backgroundColor:GlobalStyle.ChipColor[item.user_role].color,color:"white" }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                <IconButton aria-label="detail">
                                                   <VisibilityIcon sx={{color:"rgba(0, 0, 0, 0.54)"}} onClick={()=>handleView(item.id)}/>
                                                </IconButton>
                                                    {/* <Edit auth={auth} user={item}/> */}
                                                    <DeletePopup id={item.id} user={item} auth={auth}/>
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
