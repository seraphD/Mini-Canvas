import React, { useEffect, useState } from "react";
import { Grid, Box, Drawer } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Course from "../Course/index";
import Inbox from "../Inbox";
import Help from "../Help";
import SideTabs from "../SideTabs";
import './index.css';
import { User } from "../../Hooks/interfaces";

type HomeProps = {user: User, setUser: React.Dispatch<React.SetStateAction<User>>}

function Home(props: HomeProps) {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>(props.user);

    useEffect(() => {
        if (user.userName === "") {
            if (localStorage.getItem("user") === null) {
                navigate("/login");
            }
            else {
                const user = JSON.parse(localStorage.getItem("user")!);
                setUser(user);
            }
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
                <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
                    <Drawer
                        anchor="left"
                        open={true}
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block'}
                        }}
                    >
                        <SideTabs />
                    </Drawer>
                </Grid>
                <Grid item xs={4} sm={8} md={12} lg={14} xl={18}>
                    <Routes>
                        <Route path="" element={<Dashboard user={user}/>}/>
                        <Route path="course/:courseCode/*" element={<Course userName={user.userName} role={user.role}/>}></Route>
                        <Route path="inbox" element={<Inbox />}></Route>
                        <Route path="help" element={<Help />}></Route>
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home; 