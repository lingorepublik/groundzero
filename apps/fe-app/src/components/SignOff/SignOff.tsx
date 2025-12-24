import { Container } from "./SignOff.styled.ts";
import { Button } from "@mui/material";
import { useSignOff } from "react-query";

function SignOff() {
  const mutationSignOff = useSignOff();

  const handleClick = () => {
    mutationSignOff.mutate();
  };

  return (
    <Container>
      <Button
        type="button"
        variant="contained"
        size="large"
        fullWidth
        onClick={handleClick}
        sx={{ color: "#0A6159", letterSpacing: "3px" }}
      >
        Sign Off
      </Button>
    </Container>
  );
}

export default SignOff;
