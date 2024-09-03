import axios from "axios";

axios.get("http://localhost:8002/feature-clip?broadcasterId=135783794").then(response => {
    console.log(response.status);
})