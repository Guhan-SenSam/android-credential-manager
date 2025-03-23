---
description: Handle errors when logging in users
---

# Error Handling

## No Credential Found

Thrown when across all the login providers users, the user does not have a single credential restored. This error is typically caught and ignored. The user then proceeds to sign up using the User interface of your application.

## User Cancelled The Operation

Thrown when an user cancels the create credential operation by either pressing the back button or closing the bottom card. In practice this error can be caught and ignored.

## &#x20;Operation was interrupted can be retried

Thrown when there was an internal error when saving the credential such as loss of internet connection or some other system error. In this case it is suggested that you retry the operation either with explicit notification to the user or implicitly.





