import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const InputFileUpload = ({onChange}) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddPhotoAlternateIcon />}
        >
            Select Profile Picture
            <VisuallyHiddenInput type="file" onChange={e => onChange(e)} />
        </Button>
    );
}

export default InputFileUpload;