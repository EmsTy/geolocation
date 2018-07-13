# geolocation task
The application is able to store geolocation data in database on the base of ip address ( used http://freegeoip.net/ to get geolocation data). 
Authorization process done using JWT authorization, need to register and login using respective endpoints in auth/AuthController.js.
Can add, delete and provide geolocation data from database using the respective endpoints in app/routes/controller.js.

```sh
npm install
node server.js 
```
