"use client"

import { SectionHeading } from "../atoms/Heading"
import Container from "../atoms/layouts/Container"
import { Grid } from "../atoms/layouts/Grid"

export default function HomeView() {
    return(
        <Container className="flex flex-col gap-10 py-10">
            <Grid columns={{ sm: 1, md: 2, lg: 3}}>
                <div className="h-40 bg-red-500 w-full">1</div>
                <div className="h-40 bg-red-500 w-full">1</div>
                <div className="h-40 bg-red-500 w-full">1</div>
            </Grid>

            <div className="flex flex-col gap-5">
                <SectionHeading>Discover your new favorite stay</SectionHeading>
                <Grid columns={{ sm: 1, md: 3, lg: 6}}>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                    <div className="h-[400px] bg-red-500 w-full">1</div>
                </Grid>
            </div>

            <div className="w-full bg-red-500 h-[500px]">

            </div>
        </Container>
    )
}