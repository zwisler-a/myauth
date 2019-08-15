# MyAuth

Single Sign-On server for cross domain authentication based on jwt.

## Realms

Realms in this context are used to capsule user data for each page that uses the service.
This was Page1 can have user information with "admin":true und Page2 can have user information with "admin":false.


## How it works

- Page checks if it is authenticated
- If not authenticated: 
    - Redirect to: {{host}}/api/auth/login?redirect={{post login destination}}
    - User logs in on MyAuth Service
    - MyAuth creates a single use sign in token
    - MyAuth redirects to the redirect url with the query param "token" set to the sign in token
    - Page requests the authentication token from MyAuth GET {{host}}/api/auth/getToken?signInToken={{single sign in token}}
    - Page uses the authentication token for further requests to the page server

The MyAuth service knows the secret used by the application server.


## TODO's

- [ ] User/Realm Properties
- [ ] User self care (change password, username, ect)
- [ ] Audit logs
