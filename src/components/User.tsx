import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import * as React from "react";
import {useEffect} from "react";
import UserService, {IUserBasicInfo} from "../services/UserService.ts";

function User() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [userData, setUserData] = React.useState<IUserBasicInfo>();
    
    async function load(){
        setUserData( await UserService.instance.getBasicInfo() );


    }
    
    useEffect(() => {
        setIsLoading(true);
        load()
        .then(() => {

        })
        .catch(()=>{

        })
        .finally(()=>{
            setIsLoading(false);
        })
    }, []);

    return <Stack direction="row" gap={2} sx={{flexGrow: 0, alignItems: "center"}}>
        <Typography variant="body1" component="div">
            {
                isLoading?
                    (<Skeleton variant="text"/>):
                    (`Welcome, ${userData?.firstName} ${userData?.lastName}` )
            }
        </Typography>
        <Tooltip title="Open settings">
            <IconButton
                onClick={
                    (event) => {
                        if (isLoading) return;
                        setAnchorElUser(event.currentTarget)
                    }
                }
                sx={{p: 0}}>
                {
                    isLoading?
                        (<Skeleton variant="circular"><Avatar/></Skeleton>):
                        (<Avatar>{userData?.firstName.charAt(0)}</Avatar>)
                }
            </IconButton>
        </Tooltip>
        <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top', horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top', horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={()=>setAnchorElUser(null)}
        >
            <MenuItem onClick={()=>setAnchorElUser(null)}>
                <Typography sx={{textAlign: 'center'}}>Settings</Typography>
            </MenuItem>
        </Menu>
    </Stack>
}

export default User;