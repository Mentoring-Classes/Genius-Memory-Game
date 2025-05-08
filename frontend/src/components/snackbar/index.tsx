import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'

const SnackBar = ({
	errorAlert,
	setErrorAlert,
	sucessAlert,
	setSucessAlert,
	sucessMessage,
	errorMessage

}: {
	errorAlert: boolean,
	setErrorAlert: React.Dispatch<React.SetStateAction<boolean>>,
	sucessAlert: boolean,
	setSucessAlert: React.Dispatch<React.SetStateAction<boolean>>
	sucessMessage: string,
	errorMessage: string
}) => {
	return (
		<div>
			<Snackbar
				open={sucessAlert}
				autoHideDuration={3000}
				onClose={() => setSucessAlert(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert className='PopUp' sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
					{sucessMessage}
				</Alert>
			</Snackbar>

			<Snackbar
				open={errorAlert}
				autoHideDuration={3000}
				onClose={() => setErrorAlert(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert className='PopUp' severity="error" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default SnackBar