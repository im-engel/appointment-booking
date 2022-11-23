const express = require("express")
const cors = require('cors')
import bodyParser from "body-parser";
import constants from "./utils/constants"
import getAppointmentRoutes from "./routes/appointments"

const app = express();

app.set('json spaces', 2);

app.use(cors({
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
  }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use("/api", routes());
app.use("/appointments", getAppointmentRoutes());

app.listen(constants.PORT, () => {
   console.log(`Server started at http://localhost:${constants.PORT}`);
});