"use client"

import Container from "../components/atoms/layouts/Container"
import { Grid } from "../components/atoms/layouts/Grid"


export default function HomeView() {
    return(
        <Container className="py-20 flex flex-col gap-10">

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
    )
}