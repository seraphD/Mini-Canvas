import React, {useState} from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from "react-router-dom";

function SideTabs() {
    const [value, setValue] = useState(1);
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)

        if (newValue === 1) navigate("/home");
        if (newValue === 4) navigate("/home/inbox")
        if (newValue === 5) navigate("/home/help")
    }

    return (
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab icon={<PersonIcon />} label="Account" value={0}></Tab>
            <Tab icon={<DashboardIcon />} label="Dashboard" value={1}></Tab>
            <Tab icon={<BookIcon />} label="Courses" value={2}></Tab>
            <Tab icon={<GroupIcon />} label="Groups" value={3}></Tab>
            <Tab icon={<AllInboxIcon />} label="Inbox" value={4}></Tab>
            <Tab icon={<HelpIcon />} label="Help" value={5}></Tab>
        </Tabs>
    )
}

export default SideTabs;