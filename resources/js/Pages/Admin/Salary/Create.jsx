import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import SaveIcon from '@mui/icons-material/Save';
import React from 'react';
import './Style.scss'
import {
    Box,
    Container,
    Grid,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import _debounce from 'lodash/debounce';
import { useState } from "react";
import SuccessMsg from "@/Components/Common/SuccessMsg";
import { useEffect } from "react";
import SalaryValidation from "./Component/SalaryValidation";
import Joi from "@/Util/JoiValidator";


export default function Create({ auth }) {
    const [alert ,setAlert] = useState(false);
    const [severity,setSeverity] = useState(null);
    const { data, setData, post, processing, errors,setError } = useForm({
      basic_salary: 0,
      house_rent: 0,
      leave_allowance: 0,
      medical_conveyance: 0,
      statutory_bonus: 0,
      tax_deducted: 0,
      provided_fund: 0,
      gross_salary: 0,
      net_salary: 0,
    });

    const queryString = window.location.search;
    const queryParams = queryString.substring(1).split("&");
    const params = {};

    queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });


    useEffect(() => {
        const grossSalary =
          Number(data.basic_salary) +
          Number(data.house_rent) +
          Number(data.leave_allowance) +
          Number(data.medical_conveyance) +
          Number(data.statutory_bonus) +
          Number(data.provided_fund);
        setData("gross_salary", isNaN(grossSalary) ? 0 : grossSalary);
      }, [
        data.basic_salary,
        data.house_rent,
        data.leave_allowance,
        data.medical_conveyance,
        data.statutory_bonus,
        data.provided_fund,
      ]);

      useEffect(() => {
        const taxDeducted =(Number(data.gross_salary) * Number(data.tax_deducted)) / 100;
        const netSalary = Math.ceil(Number(data.gross_salary) - taxDeducted);
        setData("net_salary", isNaN(netSalary) ? 0 : netSalary);
      }, [data.gross_salary, data.tax_deducted]);

      const handleChange = (e) => {
        // setError({
        //     ...errors,
        //     [e.target.name]:Joi.validateToPlainErrors(e.target.value,SalaryValidation.Salary_Schema[e.target.name])
        // });
        setData(e.target.name, e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.user.salary.save", params.user),{
            onSuccess:()=>{
                setAlert("Salary Created Successfully");
                setSeverity('success');
                setOpen(false);
            },onError:(error)=>{
                setError(error.error);
                setSeverity('error');
            }
        });
      };

    return (
      <AuthenticatedLayout user={auth.user}>
        {
            alert && <SuccessMsg error={alert} setError={setAlert} title={alert}/>
        }
        <Container maxWidth="md" className="shadow-sm bg-white py-5 m-5">
        <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >
          <Typography variant="h5" align="center" className="pt-3 pb-5" sx={{ fontWeight: "bold" }}>
            Salary Compensation
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit} className="salary">

                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>Basic Salary</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="basic_salary"
                        name="basic_salary"
                        type="number"
                        value={data.basic_salary == 0 ? "" : data.basic_salary}
                        autoComplete="basic_salary"
                        onChange={handleChange}
                        size="small"
                        InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                     <InputError
                                message={errors.basic_salary}
                                className="mt-2"
                            />
                </Grid>
                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>House Rent</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="house_rent"
                        name="house_rent"
                        type="number"
                        value={data.house_rent== 0 ? "" : data.house_rent}
                        autoComplete="house_rent"
                        onChange={handleChange}
                        size="small"
                        InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                     <InputError
                                message={errors.house_rent}
                                className="mt-2"
                            />
                </Grid>
                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>Leave And Travel Allowance</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="leave_allowance"
                        name="leave_allowance"
                        type="number"
                        value={data.leave_allowance == 0 ? "" : data.leave_allowance}
                        autoComplete="leave_allowance"
                        onChange={handleChange}
                        size="small"
                        InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                    <InputError
                                message={errors.leave_allowance}
                                className="mt-2"
                            />
                </Grid>
                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                   <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>Medical And Conveyance</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="medical_conveyance"
                        name="medical_conveyance"
                        type="number"
                        value={data.medical_conveyance == 0 ? "" : data.medical_conveyance}
                        autoComplete="medical_conveyance"
                        onChange={handleChange}
                        size="small"
                        InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                    <InputError
                                message={errors.medical_conveyance}
                                className="mt-2"
                            />
                </Grid>
                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>Statutory Bonus</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="statutory_bonus"
                        name="statutory_bonus"
                        type="number"
                        value={data.statutory_bonus == 0 ? "" : data.statutory_bonus}
                        autoComplete="statutory_bonus"
                        onChange={handleChange}
                        size="small"
                        InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                    <InputError
                                message={errors.statutory_bonus}
                                className="mt-2"
                            />
                </Grid>

                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                        <Grid item xs={4}>
                            <InputLabel sx={{ fontWeight:"500" }}>Provided Fund</InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            required
                            fullWidth
                            id="provided_fund"
                            name="provided_fund"
                            type="number"
                            value={data.provided_fund  == 0 ? "" : data.provided_fund}
                            autoComplete="provided_fund"
                            onChange={handleChange}
                            size="small"
                            InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                        />
                        </Grid>
                        <InputError
                                message={errors.provided_fund}
                                className="mt-2"
                            />
                </Grid>

                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight:"500" }}>Tax Deducted At Source (%)</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            required
                            fullWidth
                            id="tax_deduct"
                            name="tax_deducted"
                            type="number"
                            value={data.tax_deducted == 0 ? "" : data.tax_deducted}
                            autoComplete="tax_deduct"
                            onChange={handleChange}
                            size="small"
                            InputProps={{ startAdornment:<InputAdornment position="start"> % </InputAdornment> }}
                        />
                    </Grid>
                        <InputError
                                message={errors.tax_deducted}
                                className="mt-2"
                        />
                </Grid>

                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight: "500" }}>Gross Salary</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                     required
                     fullWidth
                     id="gross_salary"
                     type="number"
                     value={data.gross_salary}
                     autoComplete="gross_salary"
                     size="small"
                     InputProps={{ startAdornment:<InputAdornment position="start"> Rs </InputAdornment> }}
                    />
                    </Grid>
                     <InputError message={errors.gross_salary} className="mt-2" />
                </Grid>
                <Grid container className="pb-5" style={{ display:'flex',alignItems:'baseline' }}>
                    <Grid item xs={4}>
                        <InputLabel sx={{ fontWeight: "500" }}>Net Salary</InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                      required
                      fullWidth
                      id="net_salary"
                      type="number"
                      value={data.net_salary}
                      autoComplete="net_salary"
                      size="small"
                      InputProps={{ startAdornment:<InputAdornment position="start">Gross Salary - Tax Deduction = Rs </InputAdornment> }}
                    />
                    </Grid>
                     <InputError message={errors.net_salary} className="mt-2" />
                </Grid>

                <div className="flex items-center justify-center m-8">
                    <PrimaryButton
                        className="ms-4"
                        variant="contained"
                        disabled={processing}>
                        <SaveIcon sx={{ height:'15px' }}/> Create
                 </PrimaryButton>
                </div>

          </Box>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
