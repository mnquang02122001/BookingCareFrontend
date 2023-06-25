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
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
    return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
    return axios.post("/api/verify-book-appointment", data);
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
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
};
