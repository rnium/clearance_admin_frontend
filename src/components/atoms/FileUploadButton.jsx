import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const FileUploadButton = (props) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            disabled={props.isSubmitting}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            {props.title}
            <VisuallyHiddenInput type="file" onChange={e => props.onChange(e)} />
        </Button>
    );
}

export default FileUploadButton;