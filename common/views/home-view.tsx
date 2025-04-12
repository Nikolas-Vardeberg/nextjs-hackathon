"use client";

import Container from "@/common/components/atoms/layouts/Container";
import { Grid } from "@/common/components/atoms/layouts/Grid";
import Hero from "@/common/components/hero/Hero";
import heroBg from "@/assets/images/hero/background.webp";
import { HeroContent } from "../components/hero/HeroContent";
import { HeroSearch } from "../components/hero/HeroSearch";
import useSearch from "../hooks/use-search";

export default function HomeView() {
  const { handleSearch, searchPlaceholder, buttonTextState } = useSearch();
  return (
    <>
      <Hero backgroundImage={heroBg.src}>
        <HeroContent
          title="Your Vacation Starts Here"
          description="Tell us what inspires you, and our AI will craft the perfect journey tailored just for you"
          alignment="left"
        >
          <HeroSearch
            placeholder={searchPlaceholder}
            buttonText={buttonTextState}
            onSearch={handleSearch}
          />
        </HeroContent>
      </Hero>

      <Container as="section" className="py-20 flex flex-col gap-10">
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} className="w-full">
          <div className="w-full bg-red-500 h-52"></div>
          <div className="w-full bg-red-500 h-52"></div>
          <div className="w-full bg-red-500 h-52"></div>
        </Grid>

        <Grid columns={{ sm: 1, md: 3, lg: 6 }} className="w-full">
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
        </Grid>

        <Grid columns={{ sm: 1 }}>
          <div className="w-full bg-red-500 h-[700px]"></div>
        </Grid>

        <Grid columns={{ sm: 1, md: 2, lg: 4 }} className="w-full">
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
        </Grid>

        <Grid columns={{ sm: 1, md: 3, lg: 5 }} className="w-full">
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
        </Grid>
      </Container>
    </>
  );
}
