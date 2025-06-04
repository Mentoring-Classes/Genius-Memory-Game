import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'

interface SnackBarProps {
	errorAlert: boolean,
	setErrorAlert: React.Dispatch<React.SetStateAction<boolean>>,
	sucessAlert: boolean,
	setSucessAlert: React.Dispatch<React.SetStateAction<boolean>>
	sucessMessage: string,
	errorMessage: string
	autoHideDuration?: number
	vertical: 'top' | 'bottom'
	horizontal: 'left' | 'center' | 'right'
}

const SnackBar = ({errorAlert,setErrorAlert,sucessAlert,setSucessAlert,sucessMessage,errorMessage,autoHideDuration,vertical,horizontal}: SnackBarProps) => {
	return (
		<div>
			<Snackbar
				open={sucessAlert}
				autoHideDuration={autoHideDuration}
				onClose={() => setSucessAlert(false)}
				anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
			>
				<Alert className='PopUp' sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
					{sucessMessage}
				</Alert>
			</Snackbar>

			<Snackbar
				open={errorAlert}
				autoHideDuration={3000}
				onClose={() => setErrorAlert(false)}
				anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
			>
				<Alert className='PopUp' severity="error" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default SnackBar