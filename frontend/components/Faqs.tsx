import { useState } from "react";
import { useTheme, useMediaQuery, Box, Typography, Modal, Button } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { Parallax } from "react-parallax";
import { imageUrl } from "@/utils";

//
// FAQ Box
//

export interface FAQ {
  question: string;
  answer: string;
}

function FaqBox(props: FAQ) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isHuge = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: isHover
            ? // @ts-ignore
              theme.palette.primary.hover
            : theme.palette.primary.main,
          padding: "2.5%",
          margin: isMobile ? "2.5%" : "1.5%",
          color: "#fff",
          width: isMobile ? "80%" : "60%",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpen}
      >
        <Typography
          variant="h5"
          component="p"
          sx={{
            textAlign: "center",
            color: "#fff",
          }}
        >
          {props.question}
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
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
            {props.question}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: "1.2rem",
              height: isMobile ? 300 : 200,
              overflowY: "scroll",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.answer),
              }}
            ></div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

//
// FAQ Section
//

const FAQS: Array<FAQ> = [
  {
    question: "Do I have to be Greek to attend?",
    answer: "You do NOT have to be Greek to attend St. John the Divine. Our parish is made up of mostly American\nconverts, along with Greeks, Russians, Serbians, Romanians, and more. As a result, our services are\nconducted almost 100% in English.\n\n<br/>\n<br/>\n\nNote: This applies to all Orthodox churches, not only ours. You don't need to be Russian to attend a\nRussian Orthodox Church, Serbian to attend the Serbian Church, etc. In cities larger than Wheeling,\nethnic uniformity and foreign languages in Orthodox churches may be more common, but there is\ncertainly no ethnic requirement to attend an Orthodox church."
  },
  {
    question: "Considering Attending?",
    answer: "Come! The best way to learn about the Orthodox Faith is to attend the Divine Liturgy, offered here \non Sundays at 10:00 AM. The Orthodox Faith is personal and must be experienced (not just explained) \nto be understood.\n\n<br/>\n<br/>\n\nMany people interested in Orthodoxy find out about it through online sources, such as Fr. Josiah\nTrenham and Fr. Spyridon Bailey's YouTube channels. These are great resources, and we have no doubt\nthat they themselves would say attending the Divine Liturgy should be priority #1 for those interested in\nOrthodoxy.\n\n<br/>\n<br/>\n\nCome this Sunday and see what Orthodoxy is all about."
  },
  {
    question: "Are children welcome at your services?",
    answer: "More than welcome, they are a blessing. In Orthodox Christianity, children absolutely must experience\nthe Divine Liturgy. You won't find separate programs for children during the Divine Liturgy in the\nOrthodox Church.\n\n<br/>\n<br/>\n\nDo not stress about children making noise. It is important to be attentive, and we ask parents to do their\nbest with their children, but we realize that some days are more difficult than others. On those days,\ndon't worry. Their presence is a blessing."
  },
  {
    question: "When are your regular services?",
    answer: "<h3>Sundays:</h3> \nOrthros (Matins): 8:45 AM\n<br/>\nDivine Liturgy: 10:00 AM\n<br/>\n<h3>Wednesdays:</h3> \nParaklesis (Supplication Service): 5:30\n<br/>\n<br/>\nWe do our best to offer at least one weekday (morning) Liturgy every week, time permitting. See our\ncalendar below for our confirmed weekday services."
  },
  {
    question: "Where are you located?",
    answer: "Our address is 2215 Chapline St. We are located in central Wheeling, WV, 26003. We have parking spaces reserved exclusively for first-time visitors in the lot on the north side. Handicap spaces are\navailable in the south lot. Our church is fully handicap accessible."
  },
  {
    question: "Can I receive Communion?",
    answer: "Only baptized and/or chrismated members of the Orthodox Church may receive Holy Communion. Even\nthen, these members must be in good standing, meaning that they have recently come to Confession\nand have properly prepared through prayer and fasting. Baptism/Chrismation is just the beginning.\n\n<br/>\n<br/>\n\nOur world calls this 'discrimination.' The Orthodox call it a monogamous relationship, with all the\nparallels that word implies. Those who wish to commune must be dedicated to a life in Christ through\nthe means mentioned above.\n\n<br/>\n<br/>\n\nHowever, any and all are welcome and encouraged to attend our services. It would be a blessing to have\nyou with us."
  },
  {
    question: "What is the Orthodox Church?",
    answer: "Orthodoxy is the faith that established the universe. The Orthodox Church has two sides: the spiritual,\nmystical side in which all believers participate and are members of 'the church,' and its human,\ninstitutional side which manifests that spiritual reality. The two sides work together to offer eternal\nworship to our Lord, Master, and Savior Jesus Christ.\n\n<br/>\n<br/>\n\nThe Orthodox belief is the same as that of the Apostles, handed down unchanged through the twenty\ncenturies of the physical church's existence."
  },
  {
    question: "Who is Saint John?",
    answer: "The name of our Church comes from the 'Son of Thunder,' the apostle, evangelist, and theologian John. His main feast day is celebrated on September 26th. You can read more about his life <a href=\"https://www.johnsanidopoulos.com/2016/09/the-life-of-holy-apostle-and-evangelist.html\">here<a/>."
  },
  {
    question: "How do I join?",
    answer: "If you are Orthodox and new to the area, come to our services and begin a conversation with Fr.\nDemetrios and members of our warm, friendly parish.\n\n<br/>\n<br/>\n\nIf you think you may want to become an Orthodox Christian, start by coming to the Divine Liturgy on\nSundays for at least a month. Begin speaking with Fr. Demetrios and our parishioners. After a few\nmonths, if you decide you'd like to continue, Father Demetrios will begin the process of Catechism with\nyou, in which you will learn about the dogmas of the Orthodox faith and begin to implement its practice\nin daily life. After a sufficient time of catechism (at Father's discretion) has passed, he will decide on a\ndate to bring you into the church through the Mystery of either Baptism or Chrismation, based on your\nhistory."
  }
];

export default function FaqSection() {
  const theme = useTheme();
  return (
    <section id="faqs">
      <Parallax
        bgImage={imageUrl("/images/faqs_bg.webp")}
        bgImageAlt="FAQ Section Parallax"
        strength={500}
      >
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
              maxWidth: "1080px",
              padding: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {FAQS.map((faq, idx) => {
              return <FaqBox key={idx} question={faq.question} answer={faq.answer} />;
            })}
          </Box>
        </Box>
      </Parallax>
    </section>
  );
}
