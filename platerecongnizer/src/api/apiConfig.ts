import axios from "axios";

const username = "haithem belhouchet";
const password = "Algeria2022.";

export const axiosApp = axios.create({
    headers: {
        Authorization: `Basic ${window.btoa(username + ":" + password)}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})