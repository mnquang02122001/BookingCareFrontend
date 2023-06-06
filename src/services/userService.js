import axios from "../axios";
const handleLogin = (email, password) => {
    return axios.post("/api/login", {
        email,
        password,
    });
};
const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
};
const createNewUserService = (data) => {
    return axios.post("/api/create-new-user", data);
};
const deleteUserService = (id) => {
    return axios.delete("/api/delete-user", { data: { id } });
};
const editUserService = (data) => {
    return axios.put("/api/edit-user", data);
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
    return axios.post("/api/save-infor-doctors", data);
};
export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
};
