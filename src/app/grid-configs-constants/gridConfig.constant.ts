import { GridConfigModel } from "../shared/models/common/grid-config/grid-config.model";
const mainConfig: GridConfigModel = {
    columnWidth: 200
};

const UserList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'firstName',
            fieldName: 'First name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 30,
        },
        {
            field: 'lastName',
            fieldName: 'Last name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 30,
        },
        {
            field: 'email',
            fieldName: 'Email',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 35,
        },
        {
            field: 'action',
            fieldName: '',
            button: [
                { name: "Chat" }
            ],
            isPx: false,
            width: 5,
            minWidth: 60
        }
    ]
};

const TechnologyList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'name',
            fieldName: 'Name',
            filterType: {
                name: "search"
            },
            width: 15,
            isPx: false
        },
        {
            field: 'description',
            fieldName: 'Description',
            width: 70,
            isPx: false
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "update" },
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const CategoryList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'name',
            fieldName: 'Name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'description',
            fieldName: 'Description',
            isPx: false,
            width: 35,
        },
        {
            field: 'svgImage',
            fieldName: 'SVG Image',
            isPx: false,
            width: 35,
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "update" },
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const WorkSampleList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'name',
            fieldName: 'Name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'description',
            fieldName: 'Description',
            isPx: false,
            width: 70,
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "update" },
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const RoleEmployeeList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'name',
            fieldName: 'Name',
            isPx: false,
            width: 15,
        },
        {
            field: 'title',
            fieldName: 'Title',
            isPx: false,
            width: 70,
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "update" },
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const EmployeeList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'firstName',
            fieldName: 'First name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'lastName',
            fieldName: 'Last name',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'description',
            fieldName: 'Description',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 25,
        },
        {
            field: 'email',
            fieldName: 'Email',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'roles',
            fieldName: 'Role',
            filterType: "select",
            isPx: false,
            width: 15,
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "update" },
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const ProposalList: GridConfigModel = {
    filterRow: true,
    columns: [
        {
            field: 'email',
            fieldName: 'Email',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'phoneNumber',
            fieldName: 'Phone Number',
            filterType: {
                name: "search"
            },
            isPx: false,
            width: 15,
        },
        {
            field: 'name',
            fieldName: 'Name',
            isPx: false,
            width: 15,
        },
        {
            field: 'message',
            fieldName: 'Message',
            isPx: false,
            width: 40,
        },
        {
            field: 'action',
            fieldName: 'Action',
            button: [
                { name: "delete" }
            ],
            isPx: false,
            width: 15,
            minWidth: 60
        }
    ]
};

const configs: {[key: string]: GridConfigModel} = {
    UserList, 
    TechnologyList,
    CategoryList,
    WorkSampleList,
    RoleEmployeeList,
    EmployeeList,
    ProposalList
};

export const getConfig = (key: string) => {
    const pageConfig = configs[key];
    if (!pageConfig) {
        return mainConfig;
    }
    return Object.assign({}, mainConfig, pageConfig)
};
