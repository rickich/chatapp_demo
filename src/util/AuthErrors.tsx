type FirebaseError = {
	code: string
	message: string
}

export function handleFirebaseAuthError(error: FirebaseError): string {
	let errorMessage: string

	switch (error.code) {
		case "auth/invalid-email":
			errorMessage = "The email address is badly formatted."
			break
		case "auth/user-disabled":
			errorMessage = "The user account has been disabled."
			break
		case "auth/user-not-found":
			errorMessage = "No such user found."
			break
		case "auth/wrong-password":
			errorMessage = "The password is invalid."
			break
		case "auth/email-already-in-use":
			errorMessage =
				"The email address is already in use by another account."
			break
		case "auth/operation-not-allowed":
			errorMessage = "Password sign-in is disabled for this project."
			break
		case "auth/weak-password":
			errorMessage = "The password must be 6 characters long or more."
			break
		case "auth/too-many-requests":
			errorMessage =
				"Too many unsuccessful login attempts. Please try again later."
			break
		case "auth/network-request-failed":
			errorMessage = "A network error occurred. Please try again."
			break
		// Add more cases as needed.
		default:
			errorMessage = "An unknown error occurred."
	}

	return errorMessage
}
