import {
  useTheme,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { default as MuiCarousel } from "react-material-ui-carousel";
import { PLItem, WWAItem } from "@/components";
import { imageUrl } from "@/utils";

//
// Carousel Item
//

interface CarouselItemProps {
  title: string;
  image: string;
  text: string;
  desktopImageSide: string;
  backgroundColor: string;
  titleColor: string;
}

function CarouselItem(props: CarouselItemProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isHuge = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Card sx={{ display: "flex" }}>
          {/*Desktop image on left*/}
          {!isMobile && props.desktopImageSide === "left" && (
            <CardMedia
              component="img"
              sx={{ width: 300, height: 300 }}
              src={imageUrl(props.image)}
              alt={props.image}
            />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: props.backgroundColor,
              height: isMobile ? "400px" : "300px",
              margin: "0 auto",
            }}
          >
            {/*Mobile*/}
            {isMobile && (
              <CardMedia
                component="img"
                src={imageUrl(props.image)}
                alt={props.image}
                sx={{
                  height: "225px",
                  width: "100%",
                }}
              />
            )}
            <CardContent
              sx={{
                flex: "1 0 auto",
              }}
            >
              <Typography component="div" variant="h5" color={props.titleColor}>
                {props.title}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                color="#fff"
                style={{
                  fontSize: "1.2rem",
                  height: isMobile ? "110px" : "230px",
                  overflowY: "scroll",
                }}
              >
                {props.text}
              </Typography>
            </CardContent>
          </Box>
          {/*Desktop image on right*/}
          {!isMobile && props.desktopImageSide === "right" && (
            <CardMedia
              component="img"
              sx={{ width: 300, height: 300 }}
              src={imageUrl(props.image)}
              alt={props.image}
            />
          )}
        </Card>
      </Box>
    </Box>
  );
}

//
// Carousel
//

interface CarouselProps {
  items: Array<PLItem | WWAItem>;
  desktopImageSide: string;
  mobileNavBtnColor: string;
  backgroundColor: string;
  titleColor: string;
}

export default function Carousel(props: CarouselProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isHuge = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <MuiCarousel
      height={isMobile ? "400px" : "300px"}
      interval={6000}
      animation="slide"
      swipe={false}
      duration={500}
      navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          backgroundColor: isTablet
            ? props.mobileNavBtnColor
            : props.backgroundColor,
        },
      }}
    >
      {props.items.map((item, idx) => {
        return (
          <CarouselItem
            key={idx}
            title={item.title}
            image={item.image}
            text={item.text}
            desktopImageSide={props.desktopImageSide}
            backgroundColor={props.backgroundColor}
            titleColor={props.titleColor}
          />
        );
      })}
    </MuiCarousel>
  );
}
