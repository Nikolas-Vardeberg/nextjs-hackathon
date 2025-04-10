"use client";

import Container from "@/common/components/atoms/layouts/Container";
import { Grid } from "@/common/components/atoms/layouts/Grid";
import { Button } from "@/common/components/ui/Button/Button";
import { useTheme } from "next-themes";

export default function Page() {
  const { setTheme } = useTheme();

  return (
    <>
      <Container>
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} container className="w-full">
          <div className="w-full bg-red-500">1</div>
          <div className="w-full bg-red-500">1</div>
          <div className="w-full bg-red-500">1</div>
        </Grid>
      </Container>
      <div className="flex flex-col gap-8 max-w-[200px]">
        <button onClick={() => setTheme("light")}>Light Mode</button>
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
        <Button>Hei</Button>

        <div className="flex flex-col w-screen text-center max-w-md mx-auto">
          <div className="flex">
            <p className="bg-skywater text-black flex-1 p-2">Skywater text</p>
            <p className="bg-skywater text-white flex-1 p-2">Skywater text</p>
          </div>
          <div className="flex">
            <p className="bg-tealwave text-black flex-1 p-2">Tealwave text</p>
            <p className="bg-tealwave text-white flex-1 p-2">Tealwave text</p>
          </div>
          <div className="flex">
            <p className="bg-nightocean text-black flex-1 p-2">
              Nightocean text
            </p>
            <p className="bg-nightocean text-white flex-1 p-2">
              Nightocean text
            </p>
          </div>
          <div className="flex">
            <p className="bg-sunburst text-black flex-1 p-2">Sunburst text</p>
            <p className="bg-sunburst text-white flex-1 p-2">Sunburst text</p>
          </div>
          <div className="flex">
            <p className="bg-ember text-black flex-1 p-2">Ember text</p>
            <p className="bg-ember text-white flex-1 p-2">Ember text</p>
          </div>
        </div>
      </div>
    </>
  );
}
