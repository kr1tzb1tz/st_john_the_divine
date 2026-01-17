import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  Typography,
  Theme,
  SxProps,
  styled,
  keyframes,
} from "@mui/material";

const HeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,.5)",
  height: "100vh",
}));

const FadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1;}
`;

const Background = styled(Box)({
  animation: `${FadeIn}`,
  animationDuration: "4s",
  animationFillMode: "forwards",
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

interface HeroLayoutProps {
  sxBackground: SxProps<Theme>;
}

function HeroLayout(
  props: React.HTMLAttributes<HTMLDivElement> & HeroLayoutProps
) {
  const { sxBackground, children } = props;

  return (
    <HeroLayoutRoot id="hero">
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Background sx={sxBackground} />
      </Container>
    </HeroLayoutRoot>
  );
}

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const backgroundImage = "/images/hero_bg.webp";
  const cursiveImage = "/images/hero_svg.svg";

  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundColor: "#000",
      }}
    >
      <img src={backgroundImage} style={{ display: "none" }} />
      <img
        style={{
          width: isMobile ? "90%" : "60%",
        }}
        src={cursiveImage}
        alt="St. John the Divine SVG"
      />
    </HeroLayout>
  );
}
