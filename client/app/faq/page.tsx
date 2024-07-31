"use client";

import { useState } from "react";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import Headings from "../utils/Heading";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Headings
        title="FAQ's - ELearning"
        description="ELearning is a learning management system for helping programmers"
        keywords="programming,MERN"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
