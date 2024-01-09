import { useForm } from "@inertiajs/inertia-react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Constant from "./Constant";
import Create from "./Create";
import { useEffect } from "react";
import Joi from "@/Util/JoiValidator";
import InputError from "@/Components/InputError";
import Validation_Schema from "./ValidationSchema";

export default function Filter({Id,auth,isFilter,ApplyFilter,developer,handleFilter ,apply ,handleReset}) {

    const { data, setData, post, processing, errors,setError, reset } = useForm(Constant.formData);
    function convert(str) {
        let date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("-");
    }
    useEffect(()=>{
        if(!apply){
            setData({
        status:'all',
        developer_id:'all',
        from_date:null,
        to_date:null,
    });
        }
    },[isFilter]);
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
                                {/* {errors?.status && (<div className="error" style={{ color:'red' }}>{errors?.status}</div>)} */}
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
                                {/* {errors?.developer_id && (<div className="error" style={{ color:'red' }}>{errors?.developer_id}</div>)} */}
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
                                {/* {errors?.from_date && (<div className="error-text" style={{ color:'red' }}>{errors?.from_date}</div>)} */}
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
                                <InputError message={errors.to_date} className="mt-2"/>
                                {data?.from_date && errors?.to_date && (<div className="error" style={{ color:'red' }}>{errors?.to_date}</div>)}
                        </Grid>
                     </>
                 }

      </Grid>
          <Box sx={{gap:'15px', display: "flex", justifyContent:"flex-end"}}>
            {!isFilter ?
             <div style={{ height:"55px" }}>
             <Button variant="contained" onClick={handleFilter} > {'Filter'} </Button>
             </div>
            :
            <div style={{ height:'35px',display:'flex',marginBottom:"20px"}}>
                <Button variant="contained" onClick={() => {ApplyFilter(data,errors,setError)}} sx={{ marginRight:"17px" }}> Apply  </Button>
                <Button variant="contained" onClick={handleReset} color="error"> Reset  </Button>
            </div>
            }
                <Create developer={developer} Id={Id} auth={auth} />
            </Box>

        </>
    );
}



