## Taxi Dispatcher Game Deployment code

### Setup Instructions
```
npm i
npm i -d react-dom react
npm i -d survey-react
npm i -d webpack webpack-cli
```

### Steps to perform for deployment:
- Ensure the path in `game-source/FormsApp/src/page-game/helpers/SocketHandler.js` is set to `https://taxi-dispatcher.mpi-sws.org` (Comment line 149 and uncomment line 150)
- Run ```npm run build``` in `game-source/FormsApp` folder
- Copy `dist` present folder in `game-source/FormsApp` to `game-deploy`
- Check the following variables in  `game-deploy/server.js`:
    1. At line 16, `storeDirectory` should be present in the `game-deploy` folder

    2. At line 52, `totalslides` is number of scenes(currently 18)
    
    3. At line 49, path should be `__dirname + "/dist"`
    4. At line 205, update the prolific code if required

- Copy all the files present in this folder to server's folder using scp

### Additional Material:
#### Webserver
`server.js` is running in nginx

`default` file contains code for SSL certificates and nginx configs

```
sudo systemctl status nginx  //this is for checking since when the webserer runs

sudo systmctl reload nginx //reload new filex

sudo systemctl restart nginx //restart Webserver
```