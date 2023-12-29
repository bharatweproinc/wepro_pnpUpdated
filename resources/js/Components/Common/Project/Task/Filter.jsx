import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Constant from "./Constant";
import Create from "./Create";

export default function Filter({Id,auth,isFilter,ApplyFilter,developer,handleFilter}) {

    const { data, setData, post, processing, errors, reset } = useForm(Constant.formData);

    const filteredDeveloper = developer.filter((item)=> item.name !== "Project Manager")

    function convert(str) {
        let date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("-");
    }
    isFilter
    console.log(isFilter,"isFilter")

    return (
        <>

         <Grid container spacing={2} width={'100%'} >
                   {isFilter &&<>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.status}
                                    label="Status"
                                    width={'80%'}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    required
                                >
                                    <MenuItem selected value={'all'} >
                                            All
                                        </MenuItem>
                                    {Constant.statusOption.map((item, index) => (
                                        <MenuItem
                                        key={index}
                                        value={item.value}
                                        label={item.label}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                                    {/* <InputError
                                        message={errors.label}
                                        className="mt-2"
                                    /> */}
                        </Grid>

                        <Grid item xs={12} md={3}>
                                <FormControl fullWidth  size='small'>
                                    <InputLabel id="demo-simple-select-developer">Developer</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-developer"
                                        id="demo-simple-select"
                                        value={data.developer_id}
                                        label="Developer"
                                        onChange={(e) =>
                                            setData("developer_id", e.target.value)
                                        }
                                        requiredsx={{ backgroundColor:'red' }}>

                                            <MenuItem selected value={'all'} style={{ textTransform: "capitalize" }} >
                                                All
                                            </MenuItem>
                                            {developer.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item.id}
                                                    label={item.name} style={{ textTransform: "capitalize" }}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} paddingTop={'7px !important'}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <FormControl fullWidth size='small'>
                                            <DatePicker label="From"

                                            slotProps={{ textField: { size: 'small',error: false, } }}
                                            value={dayjs(data.from_date)}
                                            onChange={(e) =>
                                                setData("from_date", convert(e.$d))
                                            }/>
                                        </FormControl>
                                    </DemoContainer>
                                </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={3}  paddingTop={'7px !important'}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <FormControl fullWidth size='small'>
                                            <DatePicker label="To"
                                            slotProps={{ textField: { size: 'small',error: false, } }}
                                            value={dayjs(data.to_date)}
                                            onChange={(e) =>
                                                setData("to_date", convert(e.$d))
                                            }/>
                                        </FormControl>
                                    </DemoContainer>
                                </LocalizationProvider>
                        </Grid>
                     </>
                 }

      </Grid>
          <Box sx={{gap:'15px', display: "flex", justifyContent:"flex-end"}}>

            {!isFilter ?
            <div style={{ height:"55px" }}>
                <Button variant="contained" onClick={handleFilter} > {'Filter'}  </Button>
            </div>:
            <div style={{ height:'55px' }}>
                <Button variant="contained" onClick={() => {ApplyFilter(data)}} > Apply  </Button>
            </div>
            }
            <Create developer={developer} Id={Id} auth={auth} />
            </Box>

        </>
    );
}




// import InputLabel from "@/Components/InputLabel";
// import { useForm } from "@inertiajs/inertia-react";
// import { Button, MenuItem, Select } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { useState } from "react";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import dayjs from 'dayjs';
// import Constant from "./Constant";

// export default function Filter({ApplyFilter,developer}) {

//     const { data, setData, post, processing, errors, reset } = useForm(Constant.formData);

//     const filteredDeveloper = developer.filter((item)=> item.name !== "Project Manager")

//     function convert(str) {
//         let date = new Date(str),
//           mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//           day = ("0" + date.getDate()).slice(-2);
//         return [mnth, day, date.getFullYear()].join("-");
//     }
//     return (
//         <>
//             <div>
//                 <div style={{ display:'flex' }}>
//                     <div className="mt-4" style={{ width:"50%" }}>
//                             <InputLabel htmlFor="level" value="Status" style={{ fontSize: "15px", fontWeight: "bold", }} />
//                             <Select value={data.status} name="level" style={{ height:"42px",width:'80%'}}className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
//                                 onChange={(e) =>
//                                     setData("status", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <MenuItem selected value={'all'} >
//                                     All
//                                 </MenuItem>
//                                 {Constant.statusOption.map((item, index) => (
//                                     <MenuItem
//                                         key={index}
//                                         value={item.value}
//                                         label={item.label}
//                                     >
//                                         {item.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {/* <InputError
//                                 message={errors.label}
//                                 className="mt-2"
//                             /> */}
//                     </div>

//                     <div className="mt-4" style={{ width:"50%" }}>
//                             <InputLabel htmlFor="level" value="Developer" style={{ fontSize: "15px", fontWeight: "bold", }} />
//                             <Select value={data.developer_id} name="level" style={{ height: "42px",width:'80%'}}className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
//                                 onChange={(e) =>
//                                     setData("developer_id", e.target.value)
//                                 }
//                                 required
//                             >
//                                 <MenuItem selected value={'all'} >
//                                     All
//                                 </MenuItem>
//                                 {filteredDeveloper.map((item, index) => (
//                                     <MenuItem
//                                         key={index}
//                                         value={item.id}
//                                         label={item.name}
//                                     >
//                                         {item.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {/* <InputError
//                                 message={errors.label}
//                                 className="mt-2"
//                             /> */}
//                     </div>
//                 </div>

//                 <div>
//                     <div style={{ display:'flex', }}>
//                         <div  className="mt-4" style={{ width:"50%" }}>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['DatePicker']}>
//                                     <DatePicker label="From"
//                                     slotProps={{ textField: { size: 'small',error: false, } }}
//                                     sx={{ width:'80%' }}
//                                     value={dayjs(data.from_date)}
//                                     onChange={(e) =>
//                                         setData("from_date", convert(e.$d))
//                                     }/>
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                         </div>

//                         <div   className="mt-4" style={{ width:"50%" }}>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['DatePicker']}>
//                                     <DatePicker label="To"
//                                     slotProps={{ textField: { size: 'small',error: false, } }}
//                                     value={dayjs(data.to_date)}
//                                     sx={{ width:'80%' }}
//                                     onChange={(e) =>
//                                         setData("to_date", convert(e.$d))
//                                     }/>
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         <Button variant="contained" onClick={() => {ApplyFilter(data)}} > Apply  </Button>
//                     </div>

//                 </div>
//             </div>

//         </>
//     );
// }
