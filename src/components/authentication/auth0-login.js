import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormHelperText } from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { useTranslation } from "react-i18next";

export const Auth0Login = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { loginWithRedirect } = useAuth();
  const { t } = useTranslation("translation");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        returnUrl: router.query.returnUrl || "/dashboard",
      });
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setError(err.message);
      }
    }
  };

  return (
    <div {...props}>
      {error && (
        <Box sx={{ my: 3 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleLogin} variant="contained">
          {t("Login")}
        </Button>
      </Box>
    </div>
  );
};
