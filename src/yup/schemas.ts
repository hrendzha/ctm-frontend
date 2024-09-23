import * as yup from "yup";

const signUpFormSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Name is a required field")
      .min(2, "Name must be at least 2 characters")
      .max(35, "Name can be max 35 characters"),
    email: yup.string().email("Email must be a valid email").required("Email is a required field"),
    password: yup
      .string()
      .trim()
      .required("Password is a required field")
      .min(7, "Password must be at least 7 characters"),
  })
  .required();

const signInFormSchema = yup
  .object({
    email: yup.string().email("Email must be a valid email").required("Email is a required field"),
    password: yup.string().trim().required("Password is a required field"),
  })
  .required();

const addContactFormSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Name is a required field")
      .min(2, "Name must be at least 2 characters"),
    number: yup.string().required("Number is a required field"),
  })
  .required();

const TERM_FIELDS_LENGTH = {
  Term: {
    Min: 1,
    Max: 1000,
  },
  Definition: {
    Min: 1,
    Max: 1000,
  },
};

const newTermSchema = yup
  .object({
    term: yup
      .string()
      .trim()
      .min(
        TERM_FIELDS_LENGTH.Term.Min,
        `Term must be at least ${TERM_FIELDS_LENGTH.Term.Min} character(-s)`
      )
      .max(
        TERM_FIELDS_LENGTH.Term.Max,
        `Term can be max ${TERM_FIELDS_LENGTH.Term.Max} character-(s)`
      )
      .required("Term is a required field"),
    definition: yup
      .string()
      .trim()
      .min(
        TERM_FIELDS_LENGTH.Definition.Min,
        `Definition must be at least ${TERM_FIELDS_LENGTH.Definition.Min} character(-s)`
      )
      .max(
        TERM_FIELDS_LENGTH.Definition.Max,
        `Definition can be max ${TERM_FIELDS_LENGTH.Definition.Max} character-(s)`
      )
      .required("Definition is a required field"),
    level: yup.number(),
  })
  .required();

const pronunciationSettingsSchema = yup
  .object({
    text: yup.string().trim().required("Text is a required field"),
  })
  .required();

export {
  signUpFormSchema,
  signInFormSchema,
  addContactFormSchema,
  newTermSchema,
  pronunciationSettingsSchema,
};
