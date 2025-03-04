---
description: Handle errors when creating a new credential
---

# Error Handling

## No Create Options Available

This error is raised when the user has not signed into a google account on their device and thus credential manager cannot find any account to save the credentials to.



## User Cancelled The Operation

Thrown when an user cancels the create credential operation by either pressing the back button or closing the bottom card. In practice this error can be caught and ignored.



## &#x20;Operation was interrupted can be retried

Thrown when there was an internal error when saving the credential such as loss of internet connection or some other system error. In this case it is suggested that you retry the operation either with explicit notification to the user or implicitly.





