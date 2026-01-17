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
// Parish Life Item
//

export interface PLItem {
  title: string;
  image: string;
  text: string;
}

//
// Parish Life Section
//

const PARISH_LIFE_ITEMS: Array<PLItem> = [
  {
    title: "Choir",
    image: "/images/parish_life_choir.webp",
    text: "Our choir is a traditional, antiphonal Byzantine choir. 'Antiphonal' means that there is both a left and right choir that alternate. We chant from music written in Byzantine notation. Our chanters have put in a lot of effort to bring this ancient tradition to America. Come and listen! It sounds like nothing else on earth."
  },
  {
    title: "Altar Servers",
    image: "/images/parish_life_altar_servers.webp",
    text: "Altar servers mystically represent the Angels serving around the heavenly altar of God. We are blessed to have a large group of young men desiring to serve God in this way."
  },
  {
    title: "Open Door",
    image: "/images/parish_life_open_door.webp",
    text: "Twice a month (2nd and 4th Tuesdays at 5:30 PM), our parish offers a hot meal to those in need in our community. This is only possible through the dedication of our parishioners who help serve, purchase groceries off the clock, and put in the time required to cook 100+ meals.\n\nWhen the weather gets colder, we also offer jackets, socks, hats, and other winter apparel to those who need it."
  },
  {
    title: "Sunday School",
    image: "/images/parish_life_sunday_school.webp",
    text: "We have a thriving Sunday School program here at St. John's. From September to May, our children (pre-k - 12) learn about various aspects of the Orthodox Christian faith and grow closer to God."
  },
  {
    title: "Youth",
    image: "/images/parish_life_youth.webp",
    text: "Our church is full of youth! From September to May, we have monthly gatherings for both high school and grade school students. Our children share in food, fun, and fellowship at these gatherings."
  },
  {
    title: "Vacation Church School",
    image: "/images/parish_life_vacation_church_school.webp",
    text: "Every year we offer a three-day program for our youth in the middle of the summer. They learn about a chosen Orthodox topic, learn to chant the beautiful hymns of the Orthodox Christian Church, and share in fellowship and communion with one another."
  },
  {
    title: "Adult Religious Education",
    image: "/images/parish_life_adult_religious_education.webp",
    text: "We offer three seasons of adult education. During the Fall, Fr. Demetrios offers an in depth lecture series on contemporary cultural issues. In the winter, we do a book study, which is more discussion-based and centers around one book, and in the Summer we have Bible Study. These happen Wednesday nights at 6:30 PM, after our weekly Wednesday evening service."
  },
  {
    title: "Men's Ministry",
    image: "/images/parish_life_men_s_ministry.webp",
    text: "Our men's ministry provides religious education, deep spiritual conversation, and true communion between the adult men of our parish, led by Fr. Demetrios. Our men also carry out group service projects as needed and decided by the ministry."
  },
  {
    title: "Bookstore & Youth Library",
    image: "/images/parish_life_bookstore___youth_library.webp",
    text: "The Orthodox Christian Faith is infinitely deep and profound, and the world could not contain the number of books that can be written on it. Nonetheless, spiritual reading is a very important aspect of the faith. The learning does not stop at Baptism! To this end, our popular bookstore and newly instituted Youth Library serve the further education of our parishioners."
  },
  {
    title: "Philoptochos",
    image: "/images/parish_life_philoptochos.webp",
    text: "Reaching out a helping hand.\n\nThe Philoptochos Society, which means 'friends of the poor,' is an important ministry in every\nGreek Orthodox parish. Our mission is to promote charitable, benevolent, and philanthropic\noutreach to the needy, the poor, the sick, and the elderly. We joyfully contribute to St. John the\nDivine's Open Door Ministry which serves our local neighbors. As stewards of the Philoptochos\nSociety, we are committed to helping those in need locally, regionally, and nationally.\n\nSaint Photini, the Samaritan Woman at the well with Christ, is the Areti Chapter's patron Saint."
  },
  {
    title: "Baking Group",
    image: "/images/parish_life_baking_group.webp",
    text: "Our baking group gets together consistently throughout the year to prepare traditional pastries for our annual bake sales. This is a great way to spend time and grow together in fellowship while also supporting philanthropic needs and charitable giving endeavors."
  },
  {
    title: "Young Adults",
    image: "/images/parish_life_young_adults.webp",
    text: "Our young adults (20s and early 30s) gather together for fellowship and fun. "
  },
  {
    title: "Church Fellowship",
    image: "/images/parish_life_church_fellowship.webp",
    text: "At times in the middle of the week we gather together to break bread."
  }
];

export default function ParishLifeSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isHuge = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <section id="parish-life">
      <Box
        style={{
          backgroundColor: theme.palette.secondary.main,
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
            Parish Life
          </Typography>
        </Box>

        <Carousel
          items={PARISH_LIFE_ITEMS}
          desktopImageSide="right"
          mobileNavBtnColor="rgba(42, 68, 106, .2)"
          backgroundColor={theme.palette.primary.main}
          titleColor="secondary"
        />
      </Box>
    </section>
  );
}
