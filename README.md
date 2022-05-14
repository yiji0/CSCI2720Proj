# CSCI2720 Group Project

## Site URL


## How to run our app
First of all, you need to specify your own server address in `App.js`. Modify the `const BACK_END` variable as your own server address.

Use the following command to start our app in your own server.
Make sure that you have installed the `serve` library globally with command `npm install -g serve`.

```bash
npm install # install the dependenies
node server.js & # run the backend server in the background
npm run build # build the app in production mode
sudo serve -s build -p 80 # run the server in port 80 (need root privilege)
```

## Academic honesty
We have read this article carefully: http://www.cuhk.edu.hk/policy/academichonesty.
