import * as yup from "yup";

const textPlease = 'Please Input'

const validateInput = yup.object({
    name_category_information: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Category Name`).required(`${textPlease} Category Name`).max(20),
    description_category_information: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Category Description`).required(`${textPlease} Category Description`).max(50),
    // description_information: yup.string().matches(/^[A-Za-z0-9\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, `${textPlease} Description Information`).required(`${textPlease} Description Information`).max(80),
  })

export default validateInput