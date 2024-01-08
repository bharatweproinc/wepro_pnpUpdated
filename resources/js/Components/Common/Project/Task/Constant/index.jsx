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
        label: "Start",
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
        label: "Complete",
        value: 'complete',
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
