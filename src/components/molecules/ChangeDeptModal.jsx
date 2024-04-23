import { useState, useEffect } from 'react';
import { Modal, Empty, Spin, message } from 'antd';
import {
    Stack, Typography, TextField, List, ListItem, ListItemButton, ListItemText,
    ListItemAvatar, Box, Button, InputLabel, Avatar, Divider, FormControl, Select, MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadMembers } from '../../pages_admin/Members';
import * as urls from '../../utils/api_urls';
import { getCookie } from '../../utils/cookies';

const undesignated_dept = {
    id: -1,
    codename: "undesignated",
    name: "<Undesignated>",
    display_name: "<Undesignated>",
    dept_type: "administrative"
}

const ChangeDeptModal = (props) => {
    const membersLoaded = useSelector(state => state.members.is_loaded)
    const [dept, setDept] = useState(-1);
    const [departments, setDepartments] = useState([]);
    const [deptsLoaded, setDeptsLoaded] = useState(false);
    const [sending, setSending] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();

    async function loadDepts() {
        try {
            let res = await axios.get(urls.departmentsUrl);
            let data = res.data;
            data.unshift(undesignated_dept);
            setDepartments(data);
            setDeptsLoaded(true);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
    }

    async function changeMember() {
        setSending(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': getCookie('csrftoken')
            },
        };
        let params = { user_id: selectedUser, dept }
        try {
            let res = await axios.post(urls.changeDeptUrl, params, config);
            await props.loadMembers();
            message.success(res.data.info);
            if (membersLoaded) {
                loadMembers(dispatch);
            }
            props.setIsModalOpen(false)
            setSelectedUser(null);
        } catch (error) {
            let error_msg = error?.response?.data?.details;
            if (error_msg === undefined) {
                error_msg = error.message;
            }
            message.error(error_msg);
        }
        setSending(false);
    }

    const searchMembers = async () => {
        let params = { query: searchQuery }
        try {
            let res = await axios.get(urls.searchMemberUrl, { params });
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
        if (!deptsLoaded) {
            loadDepts();
        }
    }, [])

    useEffect(() => {
        if (searchQuery.length) {
            searchMembers();
        } else {
            setSelectedUser(null);
        }
    }, [searchQuery])


    return (
        <Modal title="Change Department" open={props.isModalOpen} footer={null} onCancel={() => props.setIsModalOpen(false)}>
            {
                !deptsLoaded ?
                    <Stack alignItems="center" sx={{ py: 10 }}>
                        <Spin size='large' />
                    </Stack> :
                    <Stack alignItems="center" sx={{ pt: 2, pb: 1 }} spacing={2}>
                        <TextField
                            label="Member name or email"
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
                                                            <Avatar alt={m.name} src={urls.baseUrl + m.avatar_url} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={`${m.name} (${m.department})`}
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select New Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dept}
                                label="Select New Department"
                                onChange={event => setDept(event.target.value)}
                            >
                                {
                                    departments.map((d, i) => (
                                        <MenuItem value={d.id}>{d.display_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                            <Button onClick={changeMember} disabled={sending || selectedUser === null} variant='contained' sx={{ px: 2 }}>Change</Button>
                        </Box>
                    </Stack>
            }
        </Modal>
    )
}

export default ChangeDeptModal