import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
	Box, Stack
} from '@mui/material'

function RolesCard(props) {
	return (
		<Card>
			<CardContent>
				<Typography sx={{mb: 2}} gutterBottom variant="h5" component="div" align="center">
					My Roles
				</Typography>
				<Box>
					{
						props.roles.map((rolename, index) => (
							<Stack direction="row" sx={{mb:1, ml:2}} alignItems="center">
								<img src="/static/images/cube.png" alt="" width="25px" height="25px" />
								<Typography
									variant='h6'
									component='div'
									align='center'
									sx={{ ml: 2 }}
									color="text.secondary"
								>
									{rolename}
								</Typography>
							</Stack>
						))
					}
				</Box>
			</CardContent>
		</Card>
	);
}

export default RolesCard;