import {
  useTheme,
  useMediaQuery,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Carousel } from "@/components";

//
// Who We Are Item
//

export interface WWAItem {
  title: string;
  image: string;
  text: string;
}

//
// Who We Are Section
//

const WHO_WE_ARE_ITEMS: Array<WWAItem> = [
  {
    title: "The Faithful",
    image: "/images/who_we_are_the_faithful.webp",
    text: "We are a warm, welcoming parish who strive to put Christ and worship first. We are a growing community of families and we hope you soon become a part of it."
  },
  {
    title: "Our Bishop",
    image: "/images/who_we_are_our_bishop.webp",
    text: "His Eminence Metropolitan Savas of Pittsburgh is our dear bishop. He oversees 52 parishes in the Metropolis of Pittsburgh and is our church family's spiritual Father and Archpastor. We loved celebrating the Liturgy with him in late September and eagerly await his return."
  },
  {
    title: "Our Priest",
    image: "/images/who_we_are_our_priest.webp",
    text: "Fr. Demetrios Tsikouris is the parish priest of our church. The church is a family, and he is our father and spiritual guide. He was ordained in 2014 by His Eminence Metropolitan Savas of Pittsburgh and has been serving St. John's since. Prior to being ordained, Fr. Demetrios had a successful career as a University Pharmacy Professor. Father has a love for teaching the scriptures and the ways of Christ's Church. He is married to Presvytera Shelly and they have four daughters. "
  }
];

export default function WhoWeAreSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isHuge = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <section id="who-we-are">
      <Box
        style={{
          backgroundColor: theme.palette.primary.main,
          marginTop: "0",
          padding: "5%",
        }}
      >
        <Box
          sx={{
            padding: "2.5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" component="h3" color="#fff">
            Who We Are
          </Typography>
        </Box>

        <Carousel
          items={WHO_WE_ARE_ITEMS}
          desktopImageSide="left"
          mobileNavBtnColor="rgba(233,133,32,.2)"
          backgroundColor={theme.palette.secondary.main}
          titleColor="primary"
        />
      </Box>
    </section>
  );
}
