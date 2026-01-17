import { AppProps } from "next/app";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar.scss";
import "@/styles/global.scss";
import "@/styles/fonts.scss";

// Need to get these from the colors.scss file
const primaryMain = "#2a446a";
const primaryHover = "#385b8f";
const secondaryMain = "#b0903d";
const secondaryHover = "#9e7e1b";

export default function MyApp({
  Component,
  pageProps,
  // @ts-ignore
  props,
}: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryMain,
        // @ts-ignore
        hover: primaryHover,
      },
      secondary: {
        main: secondaryMain,
        // @ts-ignore
        hover: secondaryHover,
      },
    },
    typography: {
      //fontFamily: "Requiem",
      //fontFamily: "Staatliches",
      fontFamily: "Koulen",
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <main>
        <Component {...pageProps} />
        <CssBaseline />
      </main>
    </ThemeProvider>
  );
}
