import {useState} from 'react';
import { Modal } from 'antd';
import {
    Stack, Typography, TextField, FormControl, Select, MenuItem, Box, Button,
    InputLabel
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const departments = [
    {
        codename: 'general',
        name: 'General',
        title: 'General Department'
    },
    {
        codename: 'eee',
        name: 'EEE',
        title: 'Department of EEE'
    },
    {
        codename: 'cse',
        name: 'CSE',
        title: 'Department of CSE'
    },
    {
        codename: 'ce',
        name: 'CE',
        title: 'Department of CE'
    },
    {
        codename: 'non-tech',
        name: 'Non Tech',
        title: 'Non Tech Department'
    },
]

const InvitationModal = ({ isModalOpen, setIsModalOpen }) => {
    const [dept, setDept] = useState('general');
    return (
        <Modal title="" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
            <Stack alignItems="center" sx={{ pt: 5, pb: 1 }} spacing={2}>
                <img src="/static/images/message.png" alt="" width="120px" />
                <Typography variant='body1' >Send signup invitation token via email</Typography>
                <TextField
                    label="Recipient's Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dept}
                        label="Select Department"
                        onChange={event => setDept(event.target.value)}
                    >
                        {
                            departments.map((d, i) => (
                                <MenuItem value={d.codename}>{d.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', width: '100%' }} justifyContent="flex-end">
                    <Button variant='contained' startIcon={<SendIcon />} sx={{ px: 2 }}>Send</Button>
                </Box>
            </Stack>
        </Modal>
    )
}

export default InvitationModal