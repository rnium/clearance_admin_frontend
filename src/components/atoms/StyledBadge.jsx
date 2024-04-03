import {Badge} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -13,
        top: 3,
        border: `0px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default StyledBadge;