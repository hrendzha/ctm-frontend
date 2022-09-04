import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Grid, Box, Container, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "components/Copyright";
import { signInFormSchema } from "yup/schemas";
import { Section } from "components/Section";
import { Wrapper } from "components/Wrapper";
import { TitleWithIcon } from "components/TitleWithIcon";
import { EmailInputField } from "components/EmailInputField";
import { PasswordInputField } from "components/PasswordInputField";
import { SubmitFormBtn } from "components/SubmitFormBtn";
import { ICredentials, IJsonResponse } from "interfaces";
import { useAuth } from "hooks";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (credentials: ICredentials) => {
    setIsSubmitting(true);

    try {
      await auth.signIn(credentials);
      navigate("/set");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse: IJsonResponse<null> = error.response?.data;
        const isUserCredentialsIncorrect = errorResponse.statusCode === 401;
        if (isUserCredentialsIncorrect) {
          setError("password", {
            type: "incorrectCredentials",
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordHelperText =
    errors.password?.message ||
    (errors.password?.type === "incorrectCredentials" ? (
      // TODO take color from MUI color panel
      <Typography color="#d32f2f" sx={{ display: "block", mt: 1, mb: 1 }} component="span">
        The email or password you entered is incorrect
      </Typography>
    ) : (
      ""
    ));

  return (
    <Section>
      <Container maxWidth="xs">
        <Wrapper>
          <TitleWithIcon title="Sign in" icon={LockIcon} />

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <EmailInputField
              autoFocus
              helperText={errors.email?.message || ""}
              shouldShowError={Boolean(errors.email)}
              {...register("email")}
            />

            <PasswordInputField
              inputId="current-password"
              autoComplete="current-password"
              shouldShowError={Boolean(errors.password)}
              helperText={passwordHelperText}
              {...register("password")}
            />

            <SubmitFormBtn
              isSubmitting={isSubmitting}
              sx={{
                mt: errors.password?.type === "incorrectCredentials" ? 0 : 3,
                mb: 3,
              }}
            >
              Sign In
            </SubmitFormBtn>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/sign-up">
                  Don't have an account? Sign Up
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

export { SignInPage };
