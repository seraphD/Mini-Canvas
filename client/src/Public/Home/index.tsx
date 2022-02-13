import React, { useEffect, useState } from "react";
import { Grid, Box, Drawer, Divider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import Course from "../Course";
import Inbox from "../Inbox";
import Help from "../Help";
import SideTabs from "../SideTabs";
import './index.css'

function Home() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={0} sm={1} md={1}>
                    <Drawer
                        anchor="left"
                        open={true}
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'block'}
                        }}
                    >
                        <SideTabs />
                    </Drawer>
                </Grid>
                <Grid item xs={2} sm={5} md={6}>
                    <Routes>
                        <Route path="" element={<Dashboard />}/>
                        <Route path="/course/:courseId" element={<Course />}></Route>
                        <Route path="inbox" element={<Inbox />}></Route>
                        <Route path="help" element={<Help />}></Route>
                    </Routes>
                </Grid>
                <Grid item xs={2} sm={2} md={5} sx={{textAlign: "left"}}>
                    Todo 
                    <Divider className="home-divider"/>
                    Recent Feedback
                    <Divider className="home-divider"/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;