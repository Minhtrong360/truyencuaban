import React, { useState } from "react";
import { FCheckBox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth as authFirebase } from "../hooks/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmiting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responeError", { message: error });
    }
  };
  const handleGoogleLogin = async () => {
    const provider = new firebase.authFirebase.GoogleAuthProvider();
    try {
      await authFirebase.signInWithPopup(provider);
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new firebase.authFirebase.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mt={15}>
          {!!errors.responeError && (
            <Alert severity="error" sx={{ color: "white" }}>
              {errors.responeError.message}
            </Alert>
          )}
          <Alert severity="info">
            Don't have account? {""}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get start!
            </Link>
          </Alert>

          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    egde="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckBox name="remember" label="Remember me" />
          <Link component={RouterLink} variant="subtitle2" to="/">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmiting}
        >
          Login
        </LoadingButton>

        {/* <LoadingButton
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleGoogleLogin}
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Login with Google
        </LoadingButton>

        <LoadingButton
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleFacebookLogin}
        >
          Login with Facebook
        </LoadingButton> */}
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
