const formData ={
    status: "all",
    developer_id: "all",
    started: "",
    estimated_date: "",
}

const statusOption  = [
    {
        label: "New",
        value: 'new',
    },
    {
        label: "In Progress",
        value: 'in progress',
    },
    {
        label: "Pause",
        value: 'pause',
    },
    {
        label: "Hold",
        value: 'hold',
    },
    {
        label: "Completed",
        value: 'completed',
    },
    {
        label: "Reviewed",
        value: 'reviewed',
    },
    {
        label: "Debugging",
        value: 'debugging',
    },
]

const Constant = {
    formData,statusOption
}
export default Constant;
