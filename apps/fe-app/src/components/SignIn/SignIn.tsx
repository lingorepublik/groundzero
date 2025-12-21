import { Container } from "./SignIn.styles.ts";
import { useForm } from "react-hook-form";
import type { Credentials } from "shared";
import { Box, Button, TextField } from "@mui/material";
import { useSignIn } from "react-query";
import { Link } from "react-router";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Credentials>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useSignIn();

  const onSubmit = (data: Credentials) => {
    signInMutation.mutate(data);
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

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{ color: "#0A6159", letterSpacing: "3px" }}
        >
          Sign In
        </Button>
      </Box>
      <Link to="/stories">stories</Link>
    </Container>
  );
}

export default SignIn;
