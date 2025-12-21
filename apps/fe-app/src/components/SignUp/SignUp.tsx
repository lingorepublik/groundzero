import { Container } from "./SignUp.styles.ts";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSignUp } from "react-query";
import type { Credentials } from "shared";

type SignUpFormValues = Credentials & { termsConsent: boolean };

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      termsConsent: false,
    },
  });

  const signUpMutation = useSignUp();

  const onSubmit = (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          autoComplete="new-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <Box>
          <FormControlLabel
            sx={{
              alignItems: "flex-start",
              ".MuiFormControlLabel-label": {
                mt: "2px",
              },
            }}
            control={
              <Checkbox
                {...register("termsConsent", {
                  required: "You must accept the terms",
                })}
              />
            }
            label="I consent to the Terms & Conditions"
          />
          {errors.termsConsent && (
            <FormHelperText error>{errors.termsConsent.message}</FormHelperText>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{ color: "#0A6159", letterSpacing: "3px" }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;
