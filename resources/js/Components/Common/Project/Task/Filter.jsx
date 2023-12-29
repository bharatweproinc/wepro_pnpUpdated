import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/inertia-react";
import { Button, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import Constant from "./Constant";

export default function Filter({ApplyFilter,developer}) {

    const { data, setData, post, processing, errors, reset } = useForm(Constant.formData);

    const filteredDeveloper = developer.filter((item)=> item.name !== "Project Manager")

    function convert(str) {
        let date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("-");
    }
    return (
        <>
            <div>
                <div style={{ display:'flex' }}>
                    <div className="mt-4" style={{ width:"50%" }}>
                            <InputLabel htmlFor="level" value="Status" style={{ fontSize: "15px", fontWeight: "bold", }} />
                            <Select value={data.status} name="level" style={{ height:"42px",width:'80%'}}className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
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
                            {/* <InputError
                                message={errors.label}
                                className="mt-2"
                            /> */}
                    </div>

                    <div className="mt-4" style={{ width:"50%" }}>
                            <InputLabel htmlFor="level" value="Developer" style={{ fontSize: "15px", fontWeight: "bold", }} />
                            <Select value={data.developer_id} name="level" style={{ height: "42px",width:'80%'}}className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
                                onChange={(e) =>
                                    setData("developer_id", e.target.value)
                                }
                                required
                            >
                                <MenuItem selected value={'all'} >
                                    All
                                </MenuItem>
                                {filteredDeveloper.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item.id}
                                        label={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <InputError
                                message={errors.label}
                                className="mt-2"
                            /> */}
                    </div>
                </div>

                <div>
                    <div style={{ display:'flex', }}>
                        <div  className="mt-4" style={{ width:"50%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="From"
                                    slotProps={{ textField: { size: 'small',error: false, } }}
                                    sx={{ width:'80%' }}
                                    value={dayjs(data.started)}
                                    onChange={(e) =>
                                        setData("started", convert(e.$d))
                                    }/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div   className="mt-4" style={{ width:"50%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="To"
                                    slotProps={{ textField: { size: 'small',error: false, } }}
                                    value={dayjs(data.estimated_date)}
                                    sx={{ width:'80%' }}
                                    onChange={(e) =>
                                        setData("estimated_date", convert(e.$d))
                                    }/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="contained" onClick={() => {ApplyFilter(data)}} > Apply  </Button>
                    </div>

                </div>
            </div>

        </>
    );
}
