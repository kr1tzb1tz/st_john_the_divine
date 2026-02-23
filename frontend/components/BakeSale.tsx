import React from "react";
import { useTheme, useMediaQuery, Box, Typography, Button } from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";

//
// Bake Sale Configuration
//

interface BakeSaleConfig {
  title: string;
  orderMethod: string;
  orderWindowStart: string;
  orderWindowEnd: string;
  orderUrl: string;
  pickupDate: string;
  pickupTime: string;
  beneficiary: string;
  backgroundColor: string;
  accentColor: string;
  headingColor: string;
  textColor: string;
  buttonColor: string;
  buttonHoverColor: string;
}

const config: BakeSaleConfig = {
  title: "Easter Bake Sale",
  orderMethod: "ORDER ONLINE",
  orderWindowStart: "February 6th",
  orderWindowEnd: "March 20th",
  orderUrl: "https://holiday-bake-sale.square.site/",
  pickupDate: "Tuesday, March 31, 2026",
  pickupTime: "11am to 3pm",
  beneficiary: "All proceeds support local charity",
  backgroundColor: "#fdf6f0",
  accentColor: "#c9a4e8",
  headingColor: "#7b5ea7",
  textColor: "#4a3f5c",
  buttonColor: "#a8d8cb",
  buttonHoverColor: "#8ec5d6",
};

//
// Bake Sale Section
//

export default function BakeSaleSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <section id="bake-sale">
      <Box
        sx={{
          backgroundColor: config.backgroundColor,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1080px",
            padding: "4% 7.5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <CookieIcon
            sx={{
              fontSize: isMobile ? 48 : 64,
              color: config.accentColor,
            }}
          />
          <Typography
            variant="h1"
            component="h2"
            sx={{
              color: config.headingColor,
              textAlign: "center",
            }}
          >
            {config.title}
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              textAlign: "center",
              color: config.textColor,
              fontWeight: 600,
            }}
          >
            {config.orderMethod} from {config.orderWindowStart} to{" "}
            {config.orderWindowEnd}.
          </Typography>

          <Button
            variant="contained"
            href={config.orderUrl}
            target="_blank"
            rel="noreferrer"
            size="large"
            sx={{
              backgroundColor: config.buttonColor,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              paddingX: "32px",
              paddingY: "12px",
              "&:hover": {
                backgroundColor: config.buttonHoverColor,
              },
            }}
          >
            Place Order
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: config.headingColor, fontWeight: 700 }}
            >
              Pick up Day
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: config.textColor }}
            >
              {config.pickupDate}, {config.pickupTime}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            component="p"
            sx={{
              color: config.accentColor,
              fontWeight: 600,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {config.beneficiary}
          </Typography>
        </Box>
      </Box>
    </section>
  );
}
