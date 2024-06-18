import * as yup from "yup";

const textPlease = 'Please Input'

const validateInput = yup.object({
    title_information: yup.string().matches(/^[A-Za-z0-9\s]+$/, `Title Information isn't valid`).required(`${textPlease} Information Name`).max(100),
    category_information_id: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Category Information`).required(`${textPlease} Category Information`).max(20),
    description_information: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Description Information`).required(`${textPlease} Description Information`).max(500),
  })

export default validateInput