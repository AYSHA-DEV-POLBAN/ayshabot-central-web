import * as yup from "yup";

const textPlease = 'Please Input'

const validateInput = yup.object({
  name_command: yup.string().matches(/^[A-Za-z0-9\s]+$/, `Command Name isn't valid`).required(`${textPlease} Command Name`).max(20),
  response_command: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Response Command`).required(`${textPlease} Response Command`).max(500),
})

export default validateInput