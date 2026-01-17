import React from "react";
import { useTheme, useMediaQuery, Box, Typography, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { imageUrl } from "@/utils";

//
// Announcement Section
//

interface AnnouncementSectionProps {}

export default function AnnouncementSection(props: AnnouncementSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <section id="announcement">
      <Box
        sx={{
          backgroundColor: "#fce101",
          marginTop: "0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "960px",
            padding: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <ConstructionIcon fontSize="large" />
            <Typography
              variant="h3"
              component="h4"
              color="black"
              sx={{
                marginLeft: "5%",
                marginRight: "5%",
                whiteSpace: "nowrap",
              }}
            >
              Construction Notice
            </Typography>
            <EngineeringIcon fontSize="large" />
          </Box>
          <Typography
            variant="h6"
            component="p"
            sx={{
              width: "80%",
              textAlign: "center",
              color: "#000",
              marginTop: isMobile ? "2.5%" : "1%",
            }}
          >
            Access to St. John’s on Chapline Street from the north is currently
            blocked by the OVMC project. Parking in our lot or on the street of
            the 2200 block is still available. Coming from the south, go around
            the “Road Closed“ sign at Chapline and 23rd and park as usual.
          </Typography>
        </Box>
      </Box>
    </section>
  );
}
