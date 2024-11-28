## Taxi Dispatcher Game Source Code

### Setup Instructions
```
npm i
npm i -d react-dom react
npm i -d survey-react
npm i -d webpack webpack-cli
```

### Steps to perform for running game locally:
- Ensure the path in `game-source/FormsApp/src/page-game/helpers/SocketHandler.js` is set to `http://localhost:3000`(Uncomment line 149 and comment line 150)

- Run ```npm run build``` in `game-source/FormsApp` folder

- Check the following variables in  `game-source/server.js`:
    1. At line 16, `storeDirectory` should be present in the `game-source` folder
    2. At line 52, `totalslides` is number of scenes (currently 18)
    3. At line 49, path should be `__dirname + "/FormsApp/dist"`


### Starting the game (On local server):
1. Open two terminals(one in the current directory, one in the {current}/FormsApp directory)
2. Run the command 'npm run start' on both the terminals and go to http://localhost:8080 
3. To see distribution version run 'npm run build' in FormsApp directory terminal and 'npm run start' in current directory terminal and go to http://localhost:3000

### Adding Scene to the game
1. Follow the same format of input as already given in json files in `src/page-game/assets` folder 
2. Once the json file is ready, add an import startment as
    -- import input{n+1} from {location}
3. In preload function add the line
    -- this.load.json('input{n+1}', input{n+1})
4. In the create function then add the line
    -- let input_data_{n+1} = this.cache.json.get('input{n+1}')
5.  After that adding last line, add the following two lines
    -- fmap = new NewMap(this,this.findMat(input_data_{n+1}),this.findData(input_data_{n+1}));
    -- this.Maps.push(fmap);

    Keep in mind to follow the order as already followed in the create function, means,
    line in Instruction(4) is added just after the last similar line is added. Same goes
    for all the lines in the 'game.js'.

<!-- Restarting the Server -->
