import { useState } from 'react';
import {
    CardContent, CardMedia, Box, Typography, Chip, Stack, Paper, Avatar
} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import CircularProgressWithLabel from '../atoms/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import dateFormat from "dateformat";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { dateMask } from '../../utils/config';
import * as urls from '../../utils/api_urls'



const Clearance = ({ student_data, type, approvalType, onAction, sectionType, handleRemarksClick, handleDetailClick }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const performAction = async (url) => {
        setIsSubmitting(true);
        await onAction(url);
        setIsSubmitting(false);
    }
    let action_btns;
    switch (type) {
        case 'pending':
            action_btns = (<Box>
                <Chip
                    label="Approve"
                    sx={{ px: 1 }}
                    color='primary'
                    icon={<CheckIcon />}
                    onClick={() => performAction(student_data.approval_url)}
                    disabled={isSubmitting}
                    variant='contained'
                />
                <Chip
                    label="Archive"
                    sx={{ px: 1, ml: { xs: 0, md: 1 }, mt: { xs: 1, md: 0 } }}
                    color='error'
                    icon={<ArchiveIcon />}
                    disabled={isSubmitting}
                    onClick={() => performAction(student_data.archive_url)}
                    variant='outlined'
                />
            </Box>)
            break;
        case 'archived':
            action_btns = (<Box>
                <Chip
                    label="Unarchive"
                    sx={{ px: 1 }}
                    color='secondary'
                    icon={<UnarchiveIcon />}
                    onClick={() => performAction(student_data.unarchive_url)}
                    variant='contained'
                />
            </Box>)
            break;
        case 'approved':
            action_btns = (<Box>
                <Chip
                    label={`Approved at: ${dateFormat(student_data.approved_at, dateMask)}`}
                    sx={{ px: 1 }}
                    color='secondary'
                    icon={<CheckIcon />}
                    variant='outlined'
                />
            </Box>)
            break;
        default:
            action_btns = null
            break;
    }
    return (
        <Paper sx={{ display: 'flex', mb: 1 }} style={{ overflow: 'hidden' }} alignItems="center" justifyContent="center">
            <CardMedia
                component="img"
                sx={{ width: 150, height: 'auto', display: { xs: 'none', md: 'block' } }}
                // style = {{borderRadius: '5px'}}
                image={urls.baseUrl + student_data.avatar_url}
                alt="avatar"
            />
            <CardContent sx={{ width: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                    <Box sx={{ display: 'flex' }} alignItems="center">
                        <Avatar sx={{ display: { xs: 'block', md: 'none' }, width: '60px', height: '60px', mr: 1 }} src={urls.baseUrl + student_data.avatar_url} />
                        <Box component="div" flexGrow={1} >
                            <Typography component="div" variant="h5" sx={{ fontSize: { xs: '1rem', md: '1.3rem' } }} >
                                {student_data.name}
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary" component="span" sx={{ fontSize: { xs: '0.8rem', md: '1.1rem' } }}>
                                    {student_data.registration}
                                </Typography>
                                <Typography variant="subtitle1" color="secondary" component="span" sx={{ fontSize: { xs: '0.8rem', md: '1.1rem' } }}>
                                    {student_data.session}
                                </Typography>
                            </Stack>
                            <Typography container="span" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }} color="text.secondary">
                                Applied At: {dateFormat(student_data.applied_at, dateMask)}
                            </Typography>
                        </Box>
                        <Box>
                            <CircularProgressWithLabel sx={{ display: { xs: 'none', md: 'block' } }} value={student_data.progress} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        {action_btns}
                        <Box>
                        {
                            sectionType === 'dept_head' ?
                                <Chip
                                    label="Insider"
                                    icon={<DeviceHubIcon />}
                                    onClick={() => handleDetailClick(approvalType, student_data.id)}
                                    sx={{ px: 1, mr: { xs: 0, md: 1 }, mb: { xs: 1, md: 0 } }}
                                /> : null
                        }

                        <Chip
                            label="Remarks"
                            icon={<NotesIcon />}
                            onClick={() => handleRemarksClick(approvalType, student_data.id)}
                            sx={{ px: 1 }}
                        />
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Paper>
    )
}

export default Clearance