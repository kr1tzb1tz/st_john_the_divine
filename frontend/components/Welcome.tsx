import React from "react";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { imageUrl } from "@/utils";

//
// Upcoming Event
//

export interface UpcomingEvent {
  name: string;
  when: string;
}

function UpcomingEventBox(props: UpcomingEvent) {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h5"
        component="p"
        sx={{
          textAlign: "center",
          color: "#fff",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>{props.name}</span>
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: theme.palette.secondary.main,
          padding: "2.5%",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          {props.when}
        </Typography>
      </Box>
    </>
  );
}

//
// Upcoming Events
//

interface UpcomingEventsProps {
  upcomingEvents: Array<UpcomingEvent>;
}

function UpcomingEvents(props: UpcomingEventsProps) {
  const theme = useTheme();
  let Events = () => {
    if (props.upcomingEvents.length == 0) {
      return <React.Fragment />;
    } else {
      return (
        <>
          <br />
          <Box sx={{ width: "70%", marginTop: "5%", marginBottom: "5%" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "48px",
                justifyContent: "center",
              }}
            >
              {props.upcomingEvents.length > 0 &&
                props.upcomingEvents.map((event, idx) => {
                  return (
                    <Box
                      key={idx}
                      sx={{
                        width: "100%",
                        maxWidth: "480px",
                      }}
                    >
                      <UpcomingEventBox name={event.name} when={event.when} />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </>
      );
    }
  };
  return <Events />;
}

//
// Welcome Section
//

export default function WelcomeSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const upcomingEvents: Array<UpcomingEvent> = [];

  return (
    <section id="welcome">
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginTop: "0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1080px",
            padding: "7.5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.goarch.org/"
            style={{ textAlign: "center" }}
          >
            <img
              style={{ width: isMobile ? "40%" : "25%", margin: "2.5%" }}
              src={`${imageUrl("/images/welcome_arch_diocese.webp")}`}
            />
          </a>
          <Typography
            variant="h1"
            component="h2"
            color={theme.palette.secondary.main}
          >
            Welcome
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              width: isMobile ? "80%" : "50%",
              textAlign: "center",
              color: "#fff",
            }}
          >
            We are a growing Christian Community in Wheeling, WV, and a local
            parish of the Greek Orthodox Archdiocese of America.
          </Typography>
          <UpcomingEvents upcomingEvents={upcomingEvents} />
        </Box>
      </Box>
    </section>
  );
}
