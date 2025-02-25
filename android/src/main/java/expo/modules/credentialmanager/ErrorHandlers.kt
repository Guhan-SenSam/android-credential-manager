package expo.modules.credentialmanager

import androidx.credentials.exceptions.CreateCredentialCancellationException
import androidx.credentials.exceptions.CreateCredentialException
import androidx.credentials.exceptions.CreateCredentialInterruptedException
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException
import androidx.credentials.exceptions.GetCredentialInterruptedException
import androidx.credentials.exceptions.NoCredentialException

suspend fun handleCreateErrors(e: CreateCredentialException): CreateErrorResponse {
    when (e) {
        is CreateCredentialCancellationException -> {
            return CreateErrorResponse(
                type = "CreateCredentialCancellationException",
                message = e.message ?: "User cancelled the operation"
            )
        }
        is CreateCredentialInterruptedException -> {
            return CreateErrorResponse(
                type = "CreateCredentialInterruptedException",
                message = e.message ?: "Operation was interrupted"
            )
        }
        else -> {
            return CreateErrorResponse(
                type = "Unknown",
                message = e.message ?: "Unknown error"
            )
        }
    }
}

suspend fun handleGetErrors(e: GetCredentialException): LoginErrorResponse {
    when (e) {
        is GetCredentialCancellationException -> {
            return LoginErrorResponse(
                type = "GetCredentialCancellationException",
                message = e.message ?: "User cancelled the operation"
            )
        }
        is GetCredentialInterruptedException -> {
            return LoginErrorResponse(
                type = "GetCredentialInterruptedException",
                message = e.message ?: "Operation was interrupted"
            )
        }
        is NoCredentialException -> {
            return LoginErrorResponse(
                type = "NoCredentialException",
                message = e.message ?: "No credentials found"
            )
        }
        else -> {
            return LoginErrorResponse(
                type = "Unknown",
                message = e.message ?: "Unknown error"
            )
        }
    }
}