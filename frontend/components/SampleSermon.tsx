import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Parallax } from "react-parallax";
import { imageUrl } from "@/utils";
import { sermonUrl } from "@/api";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function SampleSermonSection() {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only using media query after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted ? isMobileQuery : false;

  const description = "Listen to experience the depth of the Orthodox faith";
  const backgroundUrl = imageUrl("/images/sermon_background_image.webp");
  const audioUrlString = sermonUrl;

  return (
    <section id="sample-sermon">
      <Parallax
        bgImage={backgroundUrl}
        bgImageAlt="Sample Sermon Parallax"
        strength={500}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            width: "100%",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "2rem 1rem" : "3rem 2rem",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h3"
              color="secondary"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 600,
                marginBottom: "1.5rem",
                fontSize: isMobile ? "2rem" : "3rem",
              }}
            >
              Sample Sermon
            </Typography>

            <Typography
              variant="body1"
              color="white"
              align="center"
              sx={{
                fontSize: isMobile ? "1.05rem" : "1.15rem",
                lineHeight: 1.6,
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
              }}
            >
              {description}
            </Typography>

            <Box
              sx={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {audioUrlString && mounted && (
                <Box sx={{ width: "100%" }}>
                  {isMobile ? (
                    // Mobile fallback - use native audio element
                    <audio
                      controls
                      style={{
                        width: "100%",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                      controlsList="nodownload"
                      playsInline
                    >
                      <source src={audioUrlString} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    // Desktop - use ReactPlayer
                    <ReactPlayer
                      src={audioUrlString}
                      controls
                      width="100%"
                      height="50px"
                      playsInline
                      style={{
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Parallax>
    </section>
  );
} 