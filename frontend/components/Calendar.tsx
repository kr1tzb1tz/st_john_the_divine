import { useState, useEffect, useCallback } from "react";
import {
  useTheme,
  useMediaQuery,
  Modal,
  Button,
  ButtonGroup,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {
  Calendar as BigCalendar,
  ToolbarProps,
  dayjsLocalizer,
  Navigate,
} from "react-big-calendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Parallax } from "react-parallax";
import dayjs from "dayjs";

// Configuration
const CALENDAR_CONFIG = {
  backgroundImage: "/images/calendar_bg.webp",
  calendarAddLink:
    "https://calendar.google.com/calendar/u/0/r?cid=stjohngochurch.stjohnthedivine@gmail.com",
  dailyReadingLink: "https://www.goarch.org/chapel",
  // Google Calendar API settings
  calendarId: "stjohngochurch.stjohnthedivine@gmail.com",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  // Time window for fetching events (in months)
  monthsBefore: 3,
  monthsAfter: 6,
};

export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

// Fetch events from Google Calendar API
async function fetchGoogleCalendarEvents(): Promise<CalendarEvent[]> {
  if (!CALENDAR_CONFIG.apiKey) {
    console.warn("Google Calendar API key not set");
    return [];
  }

  const now = new Date();
  const timeMin = new Date(
    now.getFullYear(),
    now.getMonth() - CALENDAR_CONFIG.monthsBefore,
    1
  ).toISOString();
  const timeMax = new Date(
    now.getFullYear(),
    now.getMonth() + CALENDAR_CONFIG.monthsAfter + 1,
    0
  ).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_CONFIG.calendarId
  )}/events?key=${CALENDAR_CONFIG.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.status}`);
    }

    const data = await response.json();

    return (data.items || []).map((event: any) => ({
      title: event.summary || "Untitled Event",
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      allDay: !event.start.dateTime,
    }));
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return [];
  }
}

interface CalendarToolbarButtonProps {
  text: string;
  click: Function;
}

function CalendarToolbarButton(props: CalendarToolbarButtonProps) {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <Button
      style={{
        textAlign: "center",
        backgroundColor: isHover ? theme.palette.secondary.main : "transparent",
        cursor: "pointer",
        color: "#fff",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => props.click()}
    >
      <Typography
        variant="h6"
        component="p"
        sx={{
          fontSize: ".75em",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {props.text}
      </Typography>
    </Button>
  );
}

function CalendarToolbar(props: ToolbarProps) {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const [viewState, setViewState] = useState("");

  const goToDayView = () => {
    props.onView("day");
    setViewState("day");
  };
  const goToWeekView = () => {
    props.onView("week");
    setViewState("week");
  };
  const goToMonthView = () => {
    props.onView("month");
    setViewState("month");
  };
  const goToAgendaView = () => {
    props.onView("agenda");
    setViewState("agenda");
  };

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  useEffect(() => {
    if (isTabletOrSmaller) {
      goToAgendaView();
    } else {
      goToMonthView();
    }
  }, [isTabletOrSmaller]);

  return (
    <div className="rbc-toolbar">
      <span style={{ margin: "1.5%" }} className="rbc-btn-group">
        <CalendarToolbarButton text={"<"} click={goToBack} />
        <CalendarToolbarButton text={"today"} click={goToToday} />
        <CalendarToolbarButton text={">"} click={goToNext} />
      </span>

      <Typography
        variant="h5"
        component="p"
        className="rbc-toolbar-label"
        style={{
          margin: "5px",
          textAlign: "center",
          color: theme.palette.secondary.main,
        }}
      >
        {props.label}
      </Typography>

      <span style={{ margin: "1.5%" }} className="rbc-btn-group">
        <CalendarToolbarButton text={"month"} click={goToMonthView} />
        <CalendarToolbarButton text={"week"} click={goToWeekView} />
        <CalendarToolbarButton text={"day"} click={goToDayView} />
        <CalendarToolbarButton text={"agenda"} click={goToAgendaView} />
      </span>
    </div>
  );
}

interface CalendarProps {
  events: Array<CalendarEvent>;
}

function Calendar(props: CalendarProps) {
  const theme = useTheme();
  const localizer = dayjsLocalizer(dayjs);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
  });

  const handleSelectEvent = useCallback((e: any) => {
    setSelectedEvent({
      title: e.title,
      start: e.start,
      end: e.end,
      allDay: e.allDay,
    });
    setModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      allDay: false,
    });
  };

  const prettyTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let minutesString = "";
    let ampm = hours >= 12 ? "pm" : "am";
    if (hours > 12) {
      hours = hours - 12;
    }
    if (minutes < 10) {
      minutesString = `${minutes}0`;
    } else {
      minutesString = minutes.toString();
    }
    return `${hours}:${minutesString}${ampm}`;
  };

  return (
    <>
      <BigCalendar
        events={props.events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        components={{ toolbar: CalendarToolbar }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={() => ({
          style: {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer",
            fontSize: "0.75em",
            padding: "2px 4px",
          },
        })}
        dayPropGetter={(date) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth()
          ) {
            return {
              style: {
                // @ts-ignore
                backgroundColor: theme.palette.primary.hover,
              },
            };
          }
          return {};
        }}
        style={{
          height: isMobile ? 500 : isTablet ? 650 : 800,
          width: "100%",
          fontSize: "1em",
          backgroundColor: theme.palette.primary.main,
          padding: "1.5%",
          color: "#fff",
        }}
      />
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "80%" : "60%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="p">
            {selectedEvent.title}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "1.2rem" }}
          >
            {selectedEvent.allDay
              ? "All day"
              : `${prettyTime(selectedEvent.start)} - ${prettyTime(
                  selectedEvent.end
                )}`}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default function CalendarSection() {
  const theme = useTheme();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoogleCalendarEvents()
      .then((fetchedEvents) => {
        setEvents(fetchedEvents);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="calendar">
      <Parallax
        bgImage={CALENDAR_CONFIG.backgroundImage}
        bgImageAlt="Calendar Section Parallax"
        strength={500}
      >
        <Grid
          container
          style={{
            marginTop: "0",
          }}
        >
          <Grid size={{ xs: 0, sm: 2 }} />
          <Grid size={{ xs: 12, sm: 8 }}>
            <Box
              sx={{
                padding: "5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Calendar events={events} />
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                style={{ marginTop: "2.5%" }}
              >
                <Button
                  href={CALENDAR_CONFIG.calendarAddLink}
                  startIcon={<CalendarMonthIcon />}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Subscribe
                </Button>
                <Button
                  href={CALENDAR_CONFIG.dailyReadingLink}
                  startIcon={<AutoStoriesIcon />}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  Readings
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid size={{ xs: 0, sm: 2 }} />
        </Grid>
      </Parallax>
    </section>
  );
}
