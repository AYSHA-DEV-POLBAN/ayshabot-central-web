import * as yup from "yup";

const textPlease = 'Please Input'

const validateInput = yup.object({
  name: yup.string().matches(/^[A-Za-z0-9\s]+$/, `${textPlease} Name`).required(`${textPlease} Name`).max(100),
  email: yup.string().email(`Email must be xxx@xxxxx.xx`).required(`${textPlease} Email`).max(25),
})

export default validateInput