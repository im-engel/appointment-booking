const PORT = 9000
const DATA_FILE = "src/server/data/data.json"

interface ErrCode {
    [id: string]: number;
  }

const ERROR_CODE : ErrCode = {
    "No part number specified": 404,
    "Invalid postcode": 400,
    "Invalid Params": 400,
    "Invalid request": 400
  };

const APPOINTMENT_SORT : {[id: string]: string} = {
    "date": "date",
    "clinician_name": "clinicianName"
}

export default {
    PORT,
    DATA_FILE,
    ERROR_CODE,
    APPOINTMENT_SORT
}