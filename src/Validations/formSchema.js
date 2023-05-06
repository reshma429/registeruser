import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// const digitsOnly = (value) => /^\d+$/.test(value)
// const alphaNumeric=(value) => /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i.test(value)
export const registerSchema = yup.object().shape({


    fullName: yup
        .string()
        .required("Name is required"),

    Age: yup
        .string()
        .required("Age is required"),


    Sex: yup
        .string()
        .required("select gender"),


    Mobile: yup
        .string()
        .nullable()
        .notRequired()

        .max(10)
        .when('Mobile', {
            is: (value) => value?.length,

            then: (rule) => rule.matches(phoneRegExp, 'Phone number is not valid'),
        }),


    IdType: yup
        .string(),


    GovtId: yup
        .string()


        .when("IdType", {
            is: (value) => value && value === "Aadhar",
            then: () => yup
                .string()
                .required("Please Enter Aadhar Number")
                .matches(/^\d+$/, "must be only digits")
                .min(12, "must be 12 digit Aadhar number")
                .max(12, "must be 12 digit Aadhar number"),

            otherwise: () => yup
                .string()
                .required("Please enter PAN number")
                .matches(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i, 'must contain both letters and numbers')
                .min(10, "must be 10 digit Pan number")
                .max(10, "must be 10 digit Pan number"),

        })
        .when("IdType", {
            is: (value) => value === "",
            then: () => yup.string().notRequired(),
        }


        ),
    

    guardian: yup.string(),

    EmergencyNo: yup
        .string()
        .nullable()
        .notRequired()

        .max(10)
        .when('EmergencyNo', {
            is: (value) => value?.length,

            then: (rule) => rule.matches(phoneRegExp, 'Phone number is not valid'),
        }),




},

    [
        // Add Cyclic deps here because when require itself
        ['Mobile', 'Mobile'],
        ['EmergencyNo', 'EmergencyNo'],
    ]


);