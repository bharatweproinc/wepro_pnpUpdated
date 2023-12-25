import EditIcon from "@mui/icons-material/Edit";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import _debounce from 'lodash/debounce';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography, } from "@mui/material";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import CloseIcon from '@mui/icons-material/Close';
import '@/Pages/Admin/Salary/Style.scss';
import { useState } from "react";
import { useEffect } from "react";
import UpdateIcon from '@mui/icons-material/Update';
import SuccessMsg from "../SuccessMsg";
import SalaryValidation from "./Component/SalaryValidation";
import { Joi } from "joi-browser";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    overflow: 'scroll',
    height: '80%',
    display: 'block',
};

export default function Edit({ auth, salary, userId }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState(null);

    const { data, setData, post, processing, errors ,setError } = useForm({
        basic_salary: salary[0]?.basic_salary,
        house_rent: salary[0]?.house_rent,
        leave_allowance: salary[0]?.leave_travel_allowance,
        medical_conveyance: salary[0]?.medical_and_Conveyance,
        statutory_bonus: salary[0]?.statutory_bonus,
        tax_deducted: salary[0]?.tax_deducted_at_source,
        provided_fund: salary[0]?.provided_fund,
        gross_salary: salary[0]?.gross_salary,
        net_salary: salary[0]?.net_salary,
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
        const taxDeducted =
            (Number(data.gross_salary) * Number(data.tax_deducted)) / 100;
        const netSalary = Number((data.gross_salary) - taxDeducted);
        setData("net_salary", isNaN(netSalary) ? 0 : netSalary);
    }, [data.gross_salary, data.tax_deducted]);

    const handleChange = (e) => {

        setData(e.target.name, e.target.value);
    };

    useEffect(() => {
        setData((prev) => ({
            basic_salary: prev.basic_salary,
            house_rent: prev.house_rent,
            leave_allowance: prev.leave_allowance,
            medical_conveyance: prev.medical_conveyance,
            statutory_bonus: prev.statutory_bonus,
            tax_deducted: prev.tax_deducted,
            provided_fund: prev.provided_fund,
            gross_salary: prev.gross_salary,
            net_salary: prev.net_salary,
        }))
    }, [salary]);

    const handleSubmit = (e) => {
        e.preventDefault();
        {
            auth.user.user_role === "admin" ?
                post(route("admin.user.salary.update", { id: userId }), {
                    onSuccess: () => {
                        setAlert('Salary Updated.')
                        setOpen(false);
                        setSeverity('success');
                    }, onError: () => {
                        setAlert('Something is wrong !')
                        setSeverity('error');
                    }
                })
                : auth.user.user_role === 'hr manager' &&
                post(route("hrManager.user.salary.update", { id: userId }), {
                    onSuccess: () => {
                        setAlert('Salary Updated.')
                        setOpen(false);
                        setSeverity('success');
                    }, onError: () => {
                        setAlert('Something is wrong !')
                        setSeverity('error');
                    }
                });
        }
    };
    return (
        <>
            {
                alert && <SuccessMsg severity={severity} error={alert} setError={setAlert} title={alert} />
            }
            <IconButton aria-label="edit" color="primary">
                <EditIcon color="info" onClick={handleOpen} />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                style={{ width: "" }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ width: "800px" }}>
                        <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >

                            <Typography variant="h6" align="center" className="pt-3 pb-5" sx={{ fontWeight: "bold" }}>
                                Salary Compensation
                            </Typography>

                            <Box
                                component="form"
                                sx={{ display: "flex", flexDirection: "column" }}
                                onSubmit={handleSubmit} className="salary"
                            >
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Basic Salary
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="basic_salary"
                                            name="basic_salary"
                                            type="number"
                                            value={data.basic_salary}
                                            autoComplete="basic_salary"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.basic_salary}
                                        className="mt-2"
                                    />
                                </Grid>
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            House Rent
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="house_rent"
                                            name="house_rent"
                                            type="number"
                                            value={data.house_rent}
                                            autoComplete="house_rent"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.house_rent}
                                        className="mt-2"
                                    />
                                </Grid>
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Leave And Travel Allowance
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="leave_allowance"
                                            name="leave_allowance"
                                            type="number"
                                            value={data.leave_allowance}
                                            autoComplete="leave_allowance"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.leave_allowance}
                                        className="mt-2"
                                    />
                                </Grid>
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Medical And Conveyance
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="medical_conveyance"
                                            name="medical_conveyance"
                                            type="number"
                                            value={data.medical_conveyance}
                                            autoComplete="medical_conveyance"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.medical_conveyance}
                                        className="mt-2"
                                    />
                                </Grid>
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Statutory Bonus
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="statutory_bonus"
                                            name="statutory_bonus"
                                            type="number"
                                            value={data.statutory_bonus}
                                            autoComplete="statutory_bonus"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.statutory_bonus}
                                        className="mt-2"
                                    />
                                </Grid >
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Provided Fund
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="provided_fund"
                                            name="provided_fund"
                                            type="number"
                                            value={data.provided_fund}
                                            autoComplete="provided_fund"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.provided_fund}
                                        className="mt-2"
                                    />
                                </Grid>
                                <Grid container className="pb-5" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Tax Deducted At Source (%)
                                        </InputLabel>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            id="tax_deducted"
                                            name="tax_deducted"
                                            value={data.tax_deducted}
                                            autoComplete="tax_deducted"
                                            onChange={handleChange}
                                            size="small"
                                            InputProps={{ startAdornment: <InputAdornment position="start"> % </InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.tax_deducted}
                                        className="mt-2"
                                    />
                                </Grid>

                                <Grid container className="pb-5" style={{ display: "flex", alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Gross Salary
                                        </InputLabel>
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
                                            InputProps={{ startAdornment: <InputAdornment position="start"> Rs </InputAdornment> }}
                                        />

                                    </Grid>
                                    <InputError
                                            message={errors.gross_salary}
                                            className="mt-2"
                                        />
                                </Grid>
                                <Grid container style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item xs={4}>
                                        <InputLabel sx={{ fontWeight: "500" }}>
                                            Net Salary
                                        </InputLabel>
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
                                            InputProps={{ startAdornment: <InputAdornment position="start">Gross Salary - Tax Deduction = Rs</InputAdornment> }}
                                        />
                                    </Grid>
                                    <InputError
                                        message={errors.net_salary}
                                        className="mt-2"
                                    />
                                </Grid>

                                <div className="flex salarys-center justify-center m-8">
                                    <Button onClick={handleClose} variant="contained" startIcon={<CloseIcon />} color="error"> Cancle</Button>
                                    <PrimaryButton
                                        className="ms-4"
                                        variant="contained"
                                        disabled={processing}
                                        style={{ height: "40px" }}
                                    >
                                        <UpdateIcon sx={{ height: '15px' }} /> Update
                                    </PrimaryButton>
                                </div>
                            </Box>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
