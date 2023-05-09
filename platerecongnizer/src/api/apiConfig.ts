import axios from "axios";

const username = "menad boussad";
const password = "Luffy2023#";

export const axiosApp = axios.create({
    headers: {
        Authorization: `Basic ${window.btoa(username + ":" + password)}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})