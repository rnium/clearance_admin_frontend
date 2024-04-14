import { useState, useEffect } from 'react';
import { Modal, Spin, message } from 'antd';
import {
    Stack, Typography, TextField, List, ListItem, ListItemButton, ListItemText,
    ListItemAvatar, Box, Button, InputLabel, Avatar, Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import * as urls from '../../utils/api_urls';


const MemberAssignModal = (props) => {
    const [sending, setSending] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    async function assignMember() {
        setSending(true);

        setSending(false);
    }

    return (
        <Modal title="Assign Member" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                <img src="/static/images/3d-cube.png" alt="" width="70px" />
                <Typography variant='h6' >Head of Dept of EEE</Typography>
                <TextField
                    label="Member email or first name"
                    variant="outlined"
                    // onChange={e => setEmail(e.target.value)}
                    fullWidth
                />
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    
                    <div>
                        <ListItemButton alignItems="flex-start" selected={1}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Md. Saiful Islam"
                                secondary="rniumo@gmail.com"
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </div>
                    <div>
                        <ListItemButton alignItems="flex-start" selected={0}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Md. Saiful Islam"
                                secondary="rniumo@gmail.com"
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </div>
                    <div>
                        <ListItemButton alignItems="flex-start" selected={0}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar.png" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Md. Saiful Islam"
                                secondary="rniumo@gmail.com"
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </div>
                </List>
                <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                    <Button onClick={assignMember} disabled={sending || selectedUser === null} variant='contained' startIcon={<PersonAddIcon />} sx={{ px: 2 }}>Assign</Button>
                </Box>
            </Stack>
        </Modal>
    )
}

export default MemberAssignModal