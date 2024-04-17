import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const DonwloadCard = () => {
  return (
    <Card >
      <CardMedia
        component="img"
        alt="green iguana"
        height="auto"
        image="/static/images/destination.svg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          You're Cleared
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Congratulations, you've received clearance approvals from all departments as well as administrative authorities of Sylhet Engineering College. 
        </Typography>
      </CardContent>
      <Stack sx={{px: 2, pb: 2}}>
        <Button variant='contained' sx={{borderRadius: '180px', px: 3}} size="small">Download Permit Card</Button>
      </Stack>
    </Card>
  )
}

export default DonwloadCard