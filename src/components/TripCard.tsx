import {
    Avatar,
    Card, CardActionArea,
    CardContent,
    CardHeader,
    CardMedia, Divider, IconButton,
    Stack, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import UserService, {IUserBasicInfo} from "../services/UserService.ts";
import Trip from "../data/Trip.ts";
import {FlightLandOutlined, FlightTakeoffOutlined, MoreVertOutlined} from "@mui/icons-material";

export interface TripCardProps {
    trip: Trip
}

function TripCard(props: TripCardProps) {
    const [loggedUser, setLoggedUser] = useState<IUserBasicInfo | null>(null);
    useEffect(() => {
        UserService.instance.getBasicInfo().then(u => {
            setLoggedUser(u)
        })

    }, []);
    console.log(props.trip)
    return <Card sx={{maxWidth: 345}} variant={"outlined"}>

        <CardHeader
            avatar={
                <Avatar>{loggedUser?.firstName.charAt(0)}</Avatar>
            }
            title={props.trip.title}
            subheader={props.trip.createdAt.toFormat("yyyy-LL-dd HH:mm")}
            action={
                <IconButton aria-label='settings'>
                    <MoreVertOutlined/>
                </IconButton>
            }
        />
        <CardActionArea>
            <CardMedia component="img" height={200}/>
            <CardContent>
                <Stack>
                    <Stack direction="row" spacing={2} style={{
                               width: '100%',
                               flex: 1,
                               justifyContent: 'space-evenly'
                           }}>
                        <Stack direction={"row"} gap={2}>
                            <FlightTakeoffOutlined/>
                            <Typography>{props.trip.firstDay.toFormat("yyyy-LL-dd")}</Typography>
                        </Stack>
                        <Stack direction={"row"} gap={2}>
                            <FlightLandOutlined/>
                            <Typography>{props.trip.lastDay.toFormat("yyyy-LL-dd")}</Typography>
                        </Stack>
                    </Stack>
                    {props.trip.description}
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>
}

export default TripCard;