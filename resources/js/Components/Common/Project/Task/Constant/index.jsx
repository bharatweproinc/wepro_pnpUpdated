const formData ={
    status: "all",
    developer_id: "all",
    from_date: "",
    to_date: "",
}

const statusOption  = [
    {
        label: "New",
        value: 'new',
    },
    {
        label: "Started",
        value: 'started',
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
