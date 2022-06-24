import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
    headers: { "x-auth-token": token },
});

export default api;
