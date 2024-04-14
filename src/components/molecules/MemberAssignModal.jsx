import { useState, useEffect } from 'react';
import { Modal, Empty, Spin, message } from 'antd';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState([]);
    let title;
    switch (props.selectedRole.role) {
        case 'dept_head':
            title = `Head of ${props.selectedRole.section}`
            break;
        case 'dept_clerk':
            title = `Clerk of ${props.selectedRole.section}`
            break;
        case 'lab_incharge':
            title = `In-Charge of ${props.selectedRole.title}`
            break;
        default:
            title = props.selectedRole.title;
            break;
    }

    async function assignMember() {
        setSending(true);
        setSending(false);
    }

    const searchMembers = async () => {
        let params = {query: searchQuery}
        try {
            let res = await axios.get(urls.searchMemberUrl, {params});
            setMembers(res.data);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }

    useEffect(() => {
        if (searchQuery.length) {
            searchMembers();
        } else {
            setSelectedUser(null);
        }
    }, [searchQuery])

    return (
        <Modal title="Assign Member" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                <img src="/static/images/3d-cube.png" alt="" width="70px" />
                <Typography variant='h6' >{title}</Typography>
                <TextField
                    label="Member email or first name"
                    variant="outlined"
                    onChange={e => setSearchQuery(e.target.value)}
                    fullWidth
                />
                {
                    searchQuery.length ?
                        members.length ?
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {
                                    members.map(m => (
                                        <div>
                                            <ListItemButton onClick={() => setSelectedUser(m.id)} alignItems="flex-start" selected={selectedUser === m.id}>
                                                <ListItemAvatar>
                                                    <Avatar alt={m.name} src={ urls.baseUrl + m.avatar_url} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={m.name}
                                                    secondary={m.email}
                                                />
                                            </ListItemButton>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    ))
                                }
                            </List> :
                            <Empty />
                        : null
                }

                <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                    <Button onClick={assignMember} disabled={sending || selectedUser === null} variant='contained' startIcon={<PersonAddIcon />} sx={{ px: 2 }}>Assign</Button>
                </Box>
            </Stack>
        </Modal>
    )
}

export default MemberAssignModal