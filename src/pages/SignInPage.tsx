import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Grid, Box, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useLogInMutation } from "services/api";
import Copyright from "components/Copyright";
import { signInFormSchema } from "utils/yupSchemata";
import Section from "components/Section";
import Wrapper from "components/Wrapper";
import TitleWithIcon from "components/TitleWithIcon";
import EmailInputField from "components/EmailInputField";
import PasswordInputField from "components/PasswordInputField";
import SubmitFormBtn from "components/SubmitFormBtn";
import { ICredentials } from "interfaces";

const SignInPage = () => {
  const [logIn, { isLoading: isLogInLoading }] = useLogInMutation();
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
    try {
      await logIn(credentials).unwrap();
      navigate("/contacts");
    } catch (error) {
      const isUserCredentialsIncorrect = error.status === 400 && !error.data;
      if (isUserCredentialsIncorrect) {
        setError("incorrectCredentials", {
          type: "incorrectCredentials",
        });
      }
    }
  };

  return (
    <Section>
      <Container maxWidth="xs">
        <Wrapper>
          <TitleWithIcon title="Sign in" icon={LockIcon} />

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <EmailInputField autoFocus register={register} errors={errors} />

            <PasswordInputField
              inputId="current-password"
              autoComplete="current-password"
              register={register}
              errors={errors}
              helperTextFor="signInForm"
            />

            <SubmitFormBtn
              isSubmitting={isLogInLoading}
              sx={{
                mt: errors.incorrectCredentials ? 0 : 3,
                mb: 3,
              }}
            >
              Sign In
            </SubmitFormBtn>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/register">
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
