import { Breadcrumbs, Stack, Typography } from "@mui/material";

export interface TripViewProps {
    visible: boolean;
}

function TripView(props: TripViewProps) {
    return (
        <Stack sx={{
            display: props.visible ? "block" : "none",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: 2
        }}>
            <Breadcrumbs>
                <Typography>Trips</Typography>
            </Breadcrumbs>
        </Stack>
    );   
}

export default TripView;