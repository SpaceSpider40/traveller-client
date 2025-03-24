import {Container, Stack} from "@mui/material";
import TripCard from "../components/TripCard.tsx";
import TripService, { ITrip } from "../services/TripService.ts";
import { useEffect, useState } from "react";
import Trip from "../data/Trip.ts";

export interface TripViewProps {
}

function TripView(props: TripViewProps) {
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        TripService.getTrips().then((t) => {
            setTrips(t);
        });
    }, []);

    return (
        <Container>
            <Stack
                sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                    padding: 2,
                }}
            >
                {trips.map(t => <TripCard trip={t} />)}

            </Stack>
        </Container>
    );
}

export default TripView;
