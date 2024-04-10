import {useState} from 'react';
import {
    Card, CardContent, CardMedia, Box, Typography, Chip, Stack, Paper
} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import CircularProgressWithLabel from '../atoms/CircularProgressWithLabel';
import CheckIcon from '@mui/icons-material/Check';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import dateFormat from "dateformat";
import { dateMask } from '../../utils/config';
import * as urls from '../../utils/api_urls'



const Clearance = ({ student_data, type, handleOpenModal }) => {
    let action_btns;
    switch (type) {
        case 'pending':
            action_btns = (<Box>
                <Chip
                    label="Clear"
                    sx={{ px: 1 }}
                    color='primary'
                    icon={<CheckIcon />}
                    // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                    variant='contained'
                >
                    Approve
                </Chip>
                <Chip
                    label="Archive"
                    sx={{ px: 1, ml: { xs: 0, md: 1 }, mt: { xs: 1, md: 0 } }}
                    color='error'
                    icon={<ArchiveIcon />}
                    // onClick={() => openDialog(reg.id)}
                    variant='outlined'
                >
                    Approve
                </Chip>
            </Box>)
            break;
        case 'archived':
            action_btns = (<Box>
                <Chip
                    label="Unarchive"
                    sx={{ px: 1 }}
                    color='secondary'
                    icon={<UnarchiveIcon />}
                    // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                    variant='contained'
                />
            </Box>)
            break;
        case 'approved':
            action_btns = (<Box>
                <Chip
                    label={`Signed at: ${dateFormat(student_data.approved_at, dateMask)}`}
                    sx={{ px: 1 }}
                    color='secondary'
                    icon={<CheckIcon />}
                    // onClick={() => approve_reg(baseUrl + reg.approval_link)}
                    variant='outlined'
                />
            </Box>)
            break;
        default:
            action_btns = null
            break;
    }
    return (
        <Paper sx={{ display: 'flex', mb: 1 }} style={{overflow: 'hidden'}} alignItems="center" justifyContent="center">
            <CardMedia
                component="img"
                sx={{ width: 150, height: 'auto' }}
                // style = {{borderRadius: '5px'}}
                image={urls.baseUrl + student_data.avatar_url}
                alt="avatar"
            />
            <CardContent sx={{ width: '100%' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                    <Box sx={{ display: 'flex' }} alignItems="center">
                        <Box component="div" flexGrow={1} >
                            <Typography component="div" variant="h5">
                                {student_data.name}
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary" component="span">
                                    {student_data.registration}
                                </Typography>
                                <Typography variant="subtitle1" color="secondary" component="span">
                                    {student_data.session}
                                </Typography>
                            </Stack>
                            <Typography container="span" fontSize="0.8rem" color="text.secondary">
                                Applied At: {dateFormat(student_data.applied_at, dateMask)}
                            </Typography>
                        </Box>
                        <Box>
                            <CircularProgressWithLabel value={student_data.progress} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        {action_btns}
                        <Chip label="Comments" icon={<NotesIcon />} onClick={handleOpenModal} sx={{px:1}} />
                    </Box>
                </Box>
            </CardContent>
        </Paper>
    )
}

export default Clearance