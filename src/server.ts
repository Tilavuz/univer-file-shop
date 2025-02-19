import app from "./app";
import http from "http";

const server = http.createServer(app);


import { PORT } from "./utils/shared";
server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
