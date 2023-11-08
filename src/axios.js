import axios from "axios";
import {BASE_URL} from "./Componets/Const/Const";
const instance=axios.create({
    baseURL:BASE_URL
})
export default instance

