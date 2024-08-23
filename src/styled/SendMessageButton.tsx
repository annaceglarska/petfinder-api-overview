import { Button, styled } from "@mui/material";

interface Props {
  borderRadius?: string;
}

export const StyledButton = styled(Button)<Props>`
  border: 2px solid;
  border-radius: ${(props) => props.borderRadius || "20px"};
  margin: auto;
  max-width: 200px;
`;
