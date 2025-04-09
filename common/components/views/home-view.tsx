"use client"

import { SectionHeading } from "../atoms/Heading"
import Container from "../atoms/layouts/Container"
import { Grid } from "../atoms/layouts/Grid"
import Card from "../ui/Card/Card"

export default function HomeView() {
    return(
        <Container className="flex flex-col gap-10 py-10">
            <Grid columns={{ sm: 1, md: 2, lg: 3}}>
                <Card border className="w-full h-40"></Card>
                <Card border className="w-full h-40"></Card>
                <Card border className="w-full h-40"></Card>
            </Grid>

            <div className="flex flex-col gap-5">
                <SectionHeading>Discover your new favorite stay</SectionHeading>
                <Grid columns={{ sm: 1, md: 3, lg: 6}}>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                    <Card className="h-[400px] bg-red-500 w-full"></Card>
                </Grid>
            </div>

            <Card className="w-full bg-red-500 h-[500px]"></Card>
        </Container>
    )
}