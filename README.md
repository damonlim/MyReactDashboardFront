# Getting Started with Damon FrontEnd

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Configuration settings

Make sure the dashboard backend server is up and running.\
The setting file can be found in .env file. Once you have the backend server URL or IP address, you can update REACT_APP_API_URL property with the value.

## Creating first user

Since this is a standalone application, you have to create user manually.\
For simplicity, this note assumes you are running your FrontEnd server locally hence all the urls in these examples use 'localhost'.
In order to create user, use the following url:
```
http://localhost:3000/register
```
1. Fill up the new user particulars
2. Click SignUp to submit
3. An email will be sent to admin mailbox
4. Open the mail and click on the link where it will open a new tab with an activation page
5. Click 'Active this account', you will receive a prompt that sign up is successful.

## Login to Damon dashboard application

You can use the newly created user to login to the dashboard applicatoin.\
Use the following url to login:
```
http://localhost:3000/login
or
http://localhost:3000/
```
In case you forget your password, just simply click Forget Password button from the login page.\
Fill up your email address, and a reset password link will be sent to your mailbox. \
Note: the reset link will expire in 10 minutes. \
Your login session will be maintained in your browser for 1 day, after that you may be required to login again once the session is expired.

