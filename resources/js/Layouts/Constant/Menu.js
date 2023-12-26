const Menu =  {
    "admin": [
        {
            title: 'Dashboard',
            route: "admin.dashboard",
            active: ["admin.dashboard"],
        },
        {
            title: 'Users',
            route: "admin.user.list",
            active: [
                "admin.user.list",
                "admin.user.create",
                "admin.user.edit",
                "admin.user.detail",
                "admin.user.history",
                "admin.user.leave.list",
                "admin.user.leave.create",
                "admin.user.leave.detail",
                "admin.user.salary.create",
            ],
        },
        {
            title: 'Project',
            route: "admin.project.list",
            active: [
                "admin.project.list",
                "admin.project.create",
                "admin.project.detail",
                "admin.project.edit",
                "admin.project.task.create",
                "admin.project.task.list",
                "admin.project.task.edit",
                "admin.project.task.detail",
            ],
        },{
            title: "Leave",
            route:"admin.leave.list",
            active : [
                "admin.leave.list",
            ]
        }

    ],
    "hr manager":[
        {
            title: 'Dashboard',
            route: "hrManager.dashboard",
            active: ["hrManager.dashboard"],
        },
        {
            title: 'Users',
            route: "hrManager.user.list",
            active: [
                "hrManager.user.list",
                "hrManager.user.create",
                "hrManager.user.edit",
                "hrManager.user.detail",
                "hrManager.user.history",
                "hrManager.user.salary.create",
                "hrManager.user.salary.detail",

            ],
        },
        {
            title: 'Project',
            route: "hrManager.project.list",
            active: [
                "hrManager.project.list",
                "hrManager.project.detail",
                "hrManager.project.task.detail",
                "hrManager.project.task.list",

            ]
        },{
            title: "Leave",
            route:"hrManager.leave.list",
            active : [
                "hrManager.leave.list",
            ]
        }

    ],
    "project manager":[
        {
            title: 'Dashboard',
            route: "projectManager.dashboard",
            active: [
                "projectManager.dashboard",
        ],
        },

        {
            title: 'Project',
            route: "projectManager.project.list",
            active: [
                "projectManager.project.list",
                "projectManager.project.detail",
                "projectManager.project.task.create",
                "projectManager.project.task.edit",
                "projectManager.project.task.list",
                "projectManager.project.task.detail",

            ],
        },
        {
            title: "Leave",
            route:"projectManager.leave.list",
            active : [
                "projectManager.leave.list",
            ]
        }
    ],
    "junior developer": [
        {
            title: 'Dashboard',
            route: "developer.dashboard",
            active: ["developer.dashboard"],
        },
        {
            title: 'Project',
            route: "developer.project.list",
            active: [
                "developer.project.list",
                "developer.project.detail",
                "developer.project.task.detail"
            ],
        },
        {
            title: "Leave",
            route:"developer.leave.list",
            active : [
                "developer.leave.list",
            ]
        }
    ],
    "senior developer": [

        {
            title: 'Dashboard',
            route: "developer.dashboard",
            active: ["developer.dashboard"],
        },
        {
            title: 'Project',
            route: "developer.project.list",
            active: [
                "developer.project.list",
                "developer.project.detail",
                "developer.project.task.detail"
            ],
        },
        {
            title: "Leave",
            route:"developer.leave.list",
            active : [
                "developer.leave.list",
            ]
        }
    ],

};

export default Menu;
