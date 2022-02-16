export class ConstRoutes {
    //account
    public static SIGNIN = "account/signIn";
    public static SIGNUP = "account/signUp";
    public static CONFIRM_EMAIL = "account/confirm-email";
    public static FORGOT_PASSWORD = "account/forgot-password";
    public static UPDATE_TOKENS = "account/update-tokens";

    //user
    public static LIST_USER = "user/get";
    public static UPDATE_USER = "user/update";
    public static GET_BY_ID_USER = "user/getById";
    public static DELETE_USER = "user/delete";

    //category
    public static CREATE_CATEGORY = "category/create";
    public static UPDATE_CATEGORY = "category/update";
    public static GET_CATEGORY = "category/getById";
    public static GET_CATEGORIES = "category/get";
    public static DELETE_CATEGORY = "category/delete";
    public static GET_ALL_CATEGORY = "category/get-all";

    //technology
    public static CREATE_TECHNOLOGY = "technology/create";
    public static UPDATE_TECHNOLOGY = "technology/update";
    public static GET_TECHNOLOGY = "technology/getById";
    public static GET_TECHNOLOGIES = "technology/get";
    public static DELETE_TECHNOLOGY = "technology/delete";
    public static GET_ALL_TECHNOLOGIES = "technology/get-all";

    //employee
    public static GET_EMPLOYEE = "employee/get";
    public static DELETE_EMPLOYEE = "employee/delete";
    public static GET_BY_ID_EMPLOYEE = "employee/getById";
    public static UPDATE_EMPLOYEE = "employee/update";
    public static CREATE_EMPLOYEE = "employee/create";

    //role-employee
    public static GET_ROLE_EMPLOYEES = "roleEmployee/get";
    public static DELETE_ROLE_EMPLOYEE = "roleEmployee/delete";
    public static GET_BY_ID_ROLE_EMPLOYEE = "roleEmployee/getById";
    public static CREATE_ROLE_EMPLOYEE = "roleEmployee/create";
    public static UPDATE_ROLE_EMPLOYEE = "roleEmployee/update";
    public static GET_ALL_EMPLOYEE = "roleEmployee/get-all";

    //order
    public static GET_ORDER = "order/get";
    public static DELETE_ORDER = "order/delete";
    public static GET_BY_ID_ORDER = "order/getById";
    public static CREATE_ORDER = "order/create";
    public static UPDATE_ORDER = "order/update";

    //work-sample
    public static GET_WORK_SAMPLES = "workSample/get";
    public static DELETE_WORK_SAMPLE = "workSample/delete";
    public static GET_BY_ID_WORK_SAMPLE = "workSample/getById";
    public static CREATE_WORK_SAMPLE = "workSample/create";
    public static UPDATE_WORK_SAMPLE = "workSample/update";

    //work-sample-picture
    public static CREATE_WORK_SAMPLE_PICTURE = "workSamplePicture/create";
    public static GET_BY_ID_SAMPLE_PICTURE = "workSamplePicture/getById";
    public static DELETE_WORK_SAMPLE_PICTURE = "workSamplePicture/delete";

    //user-picture
    public static CREATE_USER_PICTURE = "userPicture/create";
    public static GET_USER_PICTURE = "userPicture/getById";
    public static DELETE_USER_PICTURE = "userPicture/delete";

    //profile
    public static UPDATE_PROFILE = "profile/update";
    public static GET_PROFILE = "profile/get";

    //contact
    public static GET_BY_ID_CONTACT = "contact/getById";
    public static GET_ALL_CONTACTS = "contact/get-all";

    //message
    public static GET_FILTERED_MESSAGES = "message/get";

    //chat
    public static CHATTING = "chatting";

    //proposal
    public static CREATE_PROPOSAL = "proposal/create";
    public static GET_BY_ID_PROPOSAL = "proposal/getById";
    public static DELETE_PROPOSAL = "proposal/delete";
    public static GET_FILTERED_PROPOSALS = "proposal/get";
}
