const Permission = {
    dashboard: {
        view: ["admin" ,"project manager","hr manager","junior developer" ,"senior developer"],
    },
    users: {
        view: ["admin","hr manager"],
        list: {
                view: ['"admin',"hr manager"],
                create:["admin","hr manager"],
                salaryCreate:["admin","hr manager"],
                details: {
                    view: ["admin","hr manager"],
                    edit: ["admin", "hr manager"],

                },
                salary: {
                    view: [ "admin", "hr manager"],
                    Detail:[ "admin", "hr manager"],
                    edit:["admin", "hr manager" ],
                },
                history :{
                    view:["admin", "hr manager"],
                },
                leave:{
                    view:["admin", "hr manager"],
                    create:["admin", "hr manager"],
                    detail:{
                        view:["admin", "hr manager"],
                    },
                    edit:["admin", "hr manager"],
                }
        },
    },
    project: {
        view:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
        list:{
            view:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
            create:["admin"],
            detail:{
                view:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
                edit:[],
                task:{
                    view:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
                    create:["admin"],
                    list:{
                        view:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
                        detail:["admin", "hr manager","project manager","junior developer" ,"senior developer"],
                        edit:["admin"],
                    }
                }
            }
        }
    },
    leaves: {
        view:["admin","hr manager"],
        create:["adimin","hr manager"],
        detail:{
            view:["adimin","hr manager"],
        },
        edit:["adimin","hr manager"],
    }
}

export default Permission;
