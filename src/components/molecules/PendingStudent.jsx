import { useState } from 'react';
import {
    Paper, Box, CardMedia, Typography, Chip, Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import * as urls from '../../utils/api_urls'

const PendingStudent = ({student, approve, openDialog}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const performAprroval = async (registration) => {
        setIsSubmitting(true);
        await approve(registration);
        setIsSubmitting(false);
    }
    return (
        <Paper sx={{ display: 'flex', mb: 1, px: 1, py: 1.2, backgroundColor: '#d5e3eb' }} alignItems="center" justifyContent="center">
            <Box sx={{ display: 'flex', width: '100%' }} alignItems="center">
                <CardMedia
                    component="img"
                    sx={{ width: 80, borderRadius: '5px', m: 0, mr: 1, height: 'auto' }}
                    image={urls.baseUrl + student.avatar_url}
                    alt="avatar"
                />
                <Box component="div" flexGrow={1} >
                    <Typography component="div" variant="h5" sx={{ fontSize: '1rem' }}>
                        {student.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
                        {student.registration}
                        <Typography sx={{ ml: 1, fontSize: '0.8rem' }} variant="subtitle2" color="secondary" component="span" >
                            {student.session}
                        </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem' }} variant="subtitle2" color="text.secondary" component="span" >
                        IP: {student.ip_address}
                    </Typography>
                </Box>
                <Stack>
                    <Chip
                        label="Approve"
                        sx={{ px: 1, fontSize: '0.8rem' }}
                        color='info'
                        icon={<CheckIcon />}
                        onClick={() => performAprroval(student.registration)}
                        disabled={isSubmitting}
                        variant='contained'
                    >
                    </Chip>
                    <Chip
                        label="Delete"
                        sx={{ px: 1, mt: 0.5 }}
                        color='error'
                        icon={<DeleteIcon />}
                        disabled={isSubmitting}
                        onClick={() => openDialog(student.registration)}
                        variant='contained'
                    >
                    </Chip>
                </Stack>
            </Box>
        </Paper>
    )
}

export default PendingStudent