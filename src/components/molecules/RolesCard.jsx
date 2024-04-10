import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
	Box, Stack
} from '@mui/material';
import Adminrole from "../atoms/Adminrole";

function RolesCard(props) {
	return (
		<Card>
			<CardContent>
				<Typography sx={{mb: 2}} gutterBottom variant="h5" component="div" align="center">
					My Roles
				</Typography>
				<Box>
					{
						props.roles.map((role, index) => (
							<Adminrole key={index} role={role} />
						))
					}
				</Box>
			</CardContent>
		</Card>
	);
}

export default RolesCard;