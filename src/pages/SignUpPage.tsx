import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Link, Grid, Box, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import { api } from "api";
import { Copyright } from "components/Copyright";
import { signUpFormSchema } from "yup/schemas";
import { Section } from "components/Section";
import { Wrapper } from "components/Wrapper";
import { TitleWithIcon } from "components/TitleWithIcon";
import { NameInputField } from "components/NameInputField";
import { EmailInputField } from "components/EmailInputField";
import { PasswordInputField } from "components/PasswordInputField";
import { SubmitFormBtn } from "components/SubmitFormBtn";
import { IJsonResponse, ISignUpFormData } from "interfaces";

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = async (credentials: ISignUpFormData) => {
    setIsSubmitting(true);

    try {
      const statusCode = await api.user.signUp(credentials);
      if (statusCode === 201) {
        navigate("/sign-in");
        return;
      }
      // TODO add toast if statusCode !== 201
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse: IJsonResponse<{ fieldInWhichErrorOccurred?: string }> =
          error.response?.data;
        const isEmailError =
          errorResponse.data?.fieldInWhichErrorOccurred === "email" ||
          errorResponse.statusMessage === "Email must be a valid email";

        if (isEmailError) {
          setError(
            "email",
            {
              type: "custom",
              message: errorResponse.statusMessage,
            },
            {
              shouldFocus: true,
            }
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container maxWidth="xs">
        <Wrapper>
          <TitleWithIcon title="Sign up" icon={LockIcon} />

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <NameInputField
              autoFocus
              helperText={errors.name?.message || ""}
              shouldShowError={Boolean(errors.name)}
              {...register("name")}
            />

            <EmailInputField
              helperText={errors.email?.message || ""}
              shouldShowError={Boolean(errors.email)}
              {...register("email")}
            />

            <PasswordInputField
              inputId="new-password"
              autoComplete="new-password"
              shouldShowError={Boolean(errors.password)}
              helperText={errors.password?.message || "7 characters minimum"}
              {...register("password")}
            />

            <SubmitFormBtn isSubmitting={isSubmitting} sx={{ mb: 3 }}>
              Sign Up
            </SubmitFormBtn>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/sign-in">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>

        <Copyright />
      </Container>
    </Section>
  );
};

export { SignUpPage };
