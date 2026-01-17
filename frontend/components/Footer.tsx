import { Fragment } from "react";
import Link from "next/link";
import { useTheme, useMediaQuery, createSvgIcon, Box, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const FOOTER_DATA = {
  address: "2215 Chapline St. Wheeling, WV, 26003",
  email: "secretary@stjohngochurch.org",
  phone: "+1 304-233-0757",
  facebook: "https://www.facebook.com/SaintJohnWheeling",
  instagram: "https://www.instagram.com/stjohnthedivinegoc/",
  footerImg: "/images/footer_img.svg",
};

function Infos() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      style={{
        textAlign: isMobile ? "center" : "left",
        whiteSpace: "nowrap",
        fontSize: "1.2rem",
      }}
    >
      <Box>
        <LocationOnIcon style={{ fontSize: ".9rem" }} />
        {`  ${FOOTER_DATA.address}`}
      </Box>
      <Box>
        <EmailIcon style={{ fontSize: ".9rem" }} />
        {`  ${FOOTER_DATA.email}`}
      </Box>
      <Box>
        <LocalPhoneIcon style={{ fontSize: ".9rem" }} />
        {`  ${FOOTER_DATA.phone}`}
      </Box>
    </Box>
  );
}

function Socials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box component={Link} href={FOOTER_DATA.facebook}>
        <FacebookIcon
          style={{
            fontSize: isMobile ? "3rem" : "4rem",
          }}
          sx={{
            fill: "#fff",
            "&:hover": {
              cursor: "pointer",
              // @ts-ignore
              fill: theme.palette.primary.hover,
            },
          }}
        />
      </Box>
      <Box component={Link} href={FOOTER_DATA.instagram}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={"0%"} stopColor="rgba(254,218,117,1)" />
            <stop offset={"20%"} stopColor="rgba(250,126,30,1)" />
            <stop offset={"40%"} stopColor="rgba(214,41,118,1)" />
            <stop offset={"60%"} stopColor="rgba(150,47,191,1)" />
            <stop offset={"80%"} stopColor="rgba(79,91,213,1)" />
          </linearGradient>
        </svg>
        <InstagramIcon
          style={{
            fontSize: isMobile ? "3rem" : "4rem",
          }}
          sx={{
            fill: "#fff",
            "&:hover": {
              cursor: "pointer",
              fill: "url(#linearColors)",
            },
          }}
        />
      </Box>
    </Box>
  );
}

function Name() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      textAlign="center"
      pt={{ xs: 5, sm: 5 }}
      pb={{ xs: 0, sm: 0 }}
      fontSize="1.2rem"
      style={{ paddingTop: isMobile ? "40px" : "0px" }}
    >
      {`St. John the Divine Orthodox Church ${new Date().getFullYear()}`}
    </Box>
  );
}

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <footer>
      <Box
        px={{ xs: 0, sm: 8 }}
        py={{ xs: 0, sm: 8 }}
        bgcolor="#121212"
        color="white"
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "32%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {isMobile ? <Name /> : <Infos />}
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "32%" },
                textAlign: "center",
              }}
            >
              <Box
                href="/#"
                component={Link}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                  display: "inline-flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  style={{ width: "80%", marginBottom: "0" }}
                  src={FOOTER_DATA.footerImg}
                />
              </Box>
              {isMobile ? <Infos /> : <Name />}
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "32%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Socials />
            </Box>
          </Box>
          {isMobile && <br />}
        </Container>
      </Box>
    </footer>
  );
}
