"use client";

import { FC, useState } from "react";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Courses from "./components/Route/Courses";
import Hero from "./components/Route/Hero";
import Reviews from "./components/Route/Reviews";
import Headings from "./utils/Heading";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Headings
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Typescript, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
