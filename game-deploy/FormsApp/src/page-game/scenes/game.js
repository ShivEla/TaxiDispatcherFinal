import NewMap from '../helpers/NewMap'
import UIHandler from "../helpers/UIHandler"
import InteractiveHandler from "../helpers/InteractiveHandler"
import SocketHandler from "../helpers/SocketHandler"
import GameHandler from "../helpers/GameHandler"

import roadImg from '../assets/road2.jpg'
import wallImg from '../assets/tree2.jpg'
import grassImg from '../assets/grass.jpg'

import car0 from "../assets/car1.png"
import car1 from "../assets/car2.png"
import car2 from "../assets/car3.png"
import customer0 from "../assets/customer1.png"
import customer1 from "../assets/customer2.png"
import customer2 from "../assets/customer3.png"

import pin0 from "../assets/pin1.png"
import pin1 from "../assets/pin2.png"
import pin2 from "../assets/pin3.png"

import carBW from "../assets/carBW.png"
import customerBW0 from "../assets/customerBW1.png"
import customerBW1 from "../assets/customerBW2.png"
import customerBW2 from "../assets/customerBW3.png"

import input1 from '../assets/new/1.json';
import input2 from '../assets/new/2.json';
import input3 from '../assets/new/3.json';
import input4 from '../assets/new/4.json';
import input5 from '../assets/new/5.json';
import input6 from '../assets/new/6.json';
import input7 from '../assets/new/7.json';
import input8 from '../assets/new/8.json';
import input9 from '../assets/new/9.json';
import input10 from '../assets/new/10.json';
import input11 from '../assets/new/11.json';
import input12 from '../assets/new/12.json';
import input13 from '../assets/new/13.json';
import input14 from '../assets/new/14.json';
import input15 from '../assets/new/15.json';
import input16 from '../assets/new/16.json';
import input17 from '../assets/new/17.json';
import input18 from '../assets/new/18.json';
import input19 from '../assets/new/19.json';
import input20 from '../assets/new/20.json';
import input21 from '../assets/new/21.json';
import input22 from '../assets/new/22.json';
import input23 from '../assets/new/23.json';
import input24 from '../assets/new/24.json';
import input25 from '../assets/new/25.json';
import input26 from '../assets/new/26.json';
import input27 from '../assets/new/27.json';
import input28 from '../assets/new/28.json';
import input29 from '../assets/new/29.json';
import input30 from '../assets/new/30.json';



import boxBack from '../assets/boxBack4.jpg'

var intxt = "Welcome to your role as a cab dispatcher! Follow these steps to assign cabs to waiting customers.\n\nPairing Customers and Cabs:\nSelect one customer and one cab to make a match, considering the following: *Customer’s Waiting Time*, *Cab’s Waiting Time*, and *Pickup Distance*. These factors will help you determine the best match for each customer.\n\nViewing Wait Times:\nAbove each icon, you’ll see the details about each entity’s wait times. This includes the *customer’s waiting time* (how long the customer has been waiting for a ride), *destination distance* (how far the customer will travel after being picked up), and *cab’s waiting time* (how long the cab has been idle).\n\nPath & Distance:\nOnce you select a customer and a cab, a line will appear showing the path between them. The *pickup distance* will be displayed in the top-right corner, which will help you decide whether the match is optimal.\n\nConfirming Matches:\nOnce you’re satisfied with a customer-cab pair, press *Enter* or click the button at the top to confirm the match.\n\nRedoing Matches:\nIf you need to change your selections, press the *“Clear-Selection”* button in the top-right corner to start over and make a new pairing.\n\nNext Map:\nAfter matching all customers and cabs on a map, click *“Next Map”* in the top-right corner to proceed to the next map.\n\nSurvey:\nAfter completing all maps, click *“Take Survey”* to fill it out. Once the survey is complete, a unique code will appear—use this code to confirm completion on Prolific.\n\nBottom Text:\nAt the bottom of each page, you will see a summary of the current situation, providing you with the context for making your decisions."
var intxt2= "Welcome to your role as a cab dispatcher! Follow these steps to assign cabs to customers.\n\nPairing Customers and Cabs: Select one customer and one cab, considering the customer’s waiting time, the cab’s waiting time, and the pickup distance.\n\nViewing Wait Times: Each icon displays the customer’s waiting time, destination distance, and the cab’s idle time.\n\nPath & Distance: After selecting a pair, a line appears showing the path and the pickup distance in the top-right corner.\n\nConfirming Matches: Once satisfied with a match, press Enter or click the button at the top to confirm.\n\nRedoing Matches: To change selections, press the “Clear-Selection” button.\n\nNext Map: After completing a map, click “Next Map” to continue.\n\nSurvey: After all maps are matched, click “Take Survey.” Submit the unique code you get after completion to Prolific.\n\nBottom Text: At the bottom of each page, a summary of the current situation will be displayed."
let counter=0;
/**
 * Phaser Scene CLass initialized here.
 * It contains initialization of all 
 * the important classes which in running during the game.
 */

export default class Game extends Phaser.Scene {

    /**
     * This the constructor for the Game.
     */
    constructor() {
        super({
            key: 'Game',
        });
    }

    // handler for test button

    addInstrText(){
        this.bgd = this.add.sprite(960,512,'boxBack');
        this.sign = this.add.text(810,50, 'INSTRUCTIONS').setFontSize(40).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold');
        
        this.help = this.make.text({
            x: 300,
            y: 140,
            text: intxt2,
            // origin: { x: 0.5, y: 0.5 },
            style: {
                fontSize: 25,
                fontFamily: 'Trebuchet MS',
                color: '#000000',
                wordWrap: { width: 1400 }
            }
        });

        this.closeRect = this.add.rectangle(964,860,140,45,0xEB1D36);
        this.closeRect.setStrokeStyle(2, 0x000000);

        //close button 
        this.CloseButton = this.add.text(900,840, 'Continue').setFontSize(32).setFontFamily('Trebuchet MS').setColor('#ffffff')
        .setInteractive()
        .on('pointerdown', () => {
            this.hideSignText = !this.hideSignText;
            if(this.sign!=null){
                this.bgd.destroy();
                this.sign.destroy();
                this.help.destroy();
                this.CloseButton.destroy();
                this.closeRect.destroy();
            }
        })
        .on('pointerover', () => this.CloseButton.setStyle({ fill:'#f39c12' }))
        .on('pointerout', () => this.CloseButton.setStyle({ fill: '#ffffff' }));

    }

    updateText(){
        // displaying sign
        if(this.sign!=null){
            // this.sign.visible = false;
            // this.bgd.visible = false;
            this.bgd.destroy();
            this.sign.destroy();
            this.help.destroy();
            this.CloseButton.destroy();
            this.closeRect.destroy();
            // this.closeButton.visible = false;
        }
        if(!this.hideSignText){
            this.addInstrText();
        }
    }


    
    
    /**
     * This function is normally used to update
     * wait times for all customers as well as cars.
     * However, in the latest version, it is redundant
     * as that eature is removed. However, It is still
     * displaying the wait times.
     */

    updateWaitTime() {

        console.log('updating wait time!!');
        if(this.timeRemaining!=null){
            this.timeRemaining.destroy();
        }
        if(this.sceneTime!=0){
            this.sceneTime-=1;
            this.timeRemaining = this.add.text(222,2, this.sceneTime).setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold');
        }else{
            this.timeRemaining = this.add.text(222,2, 0).setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold');
        }
        
        if(this.sceneTime==0){
            this.socket.emit('NextScene', this.socket.id, []); //
            // this.sceneTime = 50;
        }

        // displays static customer waiting time
        for(let i=0; i<this.customerWaitingTime.length; i++){
            if(this.customerTimeText[i] != null){
                this.customerTimeText[i].destroy();
            }
            if(!this.hideCustomerText[i]){
                let tmp = this.customerWaitingTime[i] + " mins";
                let dx = this.customerCoord[i][0];
                let dy = this.customerCoord[i][1];
                // console.log("Coordinates:", dx, dy)
                this.customerTimeText[i] = this.add.text(24 + (dx - 1.5) * 72, 64 + (dy - 2) * 56,"I have been waiting for "+ tmp + " to be alloted a cab!\n"+"My destination is  "+this.customerDestination[i]+" miles away from here.").setFontSize(15).setFontStyle('bold').setFontFamily('Trebuchet MS').setColor('#FFFFFF');
            }
        }

        // displays car's fixed waiting time
        for(let i=0; i<this.carWaitingTime.length; i++){
            if(this.carTimeText[i] != null){
                this.carTimeText[i].destroy();
            }
            if(!this.hideCarText[i]){
                let tmp = this.carWaitingTime[i] + " mins";
                let dx = this.carCoord[i][0];
                let dy = this.carCoord[i][1];
                // console.log("Coordinates:", dx, dy)
                this.carTimeText[i] = this.add.text(24 + (dx - 1.5) * 72, 64 + (dy - 0.5) * 56,"It has been " +tmp+" since my last ride.\n").setFontSize(15).setFontStyle('bold').setFontFamily('Trebuchet MS').setColor('#FFFFFF');
                // this.carTimeText[i] = this.add.text(1755,190+80*i, tmp).setFontSize(28).setFontStyle('bold').setFontFamily('Trebuchet MS').setColor('#0F4C75');
            }
        }


    }

    /**
     * This function processes the input and
     * returns the Map.
     */
    findMat(input) {
        return input["scene"]["matrix"];
    }

    /**
     * This function processes the input and
     * processes for information involving car
     *  and customers.
     */
    findData(input) {
        let data = {
            "Id"            : input["scene"]["Id"], 
            "cordX"         : input["scene"]["cordX"],
            "cordY"         : input["scene"]["cordY"],
            "isCar"         : input["scene"]["isCar"],
            "isCustomer"    : input["scene"]["isCustomer"],
            "isRed"         : input["scene"]["isRed"],
            "isBlue"        : input["scene"]["isBlue"],
            "colorID"       : input["scene"]["colorID"],
            "WaitingTime"   : input["scene"]["WaitingTime"],
            "Destination"   : input["scene"]["Destination"],
            "Scenario"    : input["scene"]["Scenario"]
        }
        return data;
    }

    /**
     * This is the necessary preload function for 
     * loading all the files to the cache of the browser.
     * Here, necessary changes as per README need to done
     * whenever a new scene is added. More on this can be read from 
     * Phaser Documentation.
     */
    preload() {
        this.load.image('road', roadImg);
        this.load.image('wall', wallImg);
        this.load.image('grass', grassImg);

        this.load.image('car0', car0);
        this.load.image('car1', car1);
        this.load.image('car2', car2);
        this.load.image('customer0', customer0);
        this.load.image('customer1', customer1);
        this.load.image('customer2', customer2);

        this.load.image('carBW', carBW);
        this.load.image('customerBW0', customerBW0);
        this.load.image('customerBW1', customerBW1);
        this.load.image('customerBW2', customerBW2);

        this.load.json('input1', input1);
        this.load.json('input2', input2);
        this.load.json('input3', input3);
        this.load.json('input4', input4);
        this.load.json('input5', input5);
        this.load.json('input6', input6);
        this.load.json('input7', input7);
        this.load.json('input8', input8);
        this.load.json('input9', input9);
        this.load.json('input10', input10);
        this.load.json('input11', input11);
        this.load.json('input12', input12);
        this.load.json('input13', input13);
        this.load.json('input14', input14);
        this.load.json('input15', input15);
        this.load.json('input16', input16);
        this.load.json('input17', input17);
        this.load.json('input18', input18);
        this.load.json('input19', input19);
        this.load.json('input20', input20);
        this.load.json('input21', input21);
        this.load.json('input22', input22);
        this.load.json('input23', input23);
        this.load.json('input24', input24);
        this.load.json('input25', input25);
        this.load.json('input26', input26);
        this.load.json('input27', input27);
        this.load.json('input28', input28);
        this.load.json('input29', input29);
        this.load.json('input30', input30);


        this.load.image('boxBack',boxBack);
    }

    /**
     * This is most important part for a Phasor game.
     * It includes reading the input, making gloabal
     * initializations, for all the classes, and calling 
     * appropriate functions to start the game. More 
     * about the use of this function, can be read from
     * Phasor Documentation.
     */

    create() {
        let input_data_1 = this.cache.json.get('input1');
        let input_data_2 = this.cache.json.get('input2');
        let input_data_3 = this.cache.json.get('input3');
        let input_data_4 = this.cache.json.get('input4');
        let input_data_5 = this.cache.json.get('input5');
        let input_data_6 = this.cache.json.get('input6');
        let input_data_7 = this.cache.json.get('input7');
        let input_data_8 = this.cache.json.get('input8');
        let input_data_9 = this.cache.json.get('input9');
        let input_data_10 = this.cache.json.get('input10');
        let input_data_11 = this.cache.json.get('input11');
        let input_data_12 = this.cache.json.get('input12');
        let input_data_13 = this.cache.json.get('input13');
        let input_data_14 = this.cache.json.get('input14');
        let input_data_15 = this.cache.json.get('input15');
        let input_data_16 = this.cache.json.get('input16');
        let input_data_17 = this.cache.json.get('input17');
        let input_data_18 = this.cache.json.get('input18');
        let input_data_19 = this.cache.json.get('input19');
        let input_data_20 = this.cache.json.get('input20');
        let input_data_21 = this.cache.json.get('input21');
        let input_data_22 = this.cache.json.get('input22');
        let input_data_23 = this.cache.json.get('input23');
        let input_data_24 = this.cache.json.get('input24');
        let input_data_25 = this.cache.json.get('input25');
        let input_data_26 = this.cache.json.get('input26');
        let input_data_27 = this.cache.json.get('input27');
        let input_data_28 = this.cache.json.get('input28');
        let input_data_29 = this.cache.json.get('input29');
        let input_data_30 = this.cache.json.get('input30');

        const input_data = [];
    for (let i = 1; i <= 30; i++) {
        input_data.push(this.cache.json.get(`input${i}`));
    }

    this.Maps = [];

    // Create an array with 15 ones and 15 zeros
    const ones = Array(15).fill(1);
    const zeros = Array(15).fill(0);
    const combined = ones.concat(zeros);
    
    // Shuffle the combined array to randomize the order
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    
    // Loop through the input data and add to Maps based on the binary array
    for (let i = 0; i < input_data.length; i++) {
        const inputData = input_data[i]; // Access the input data directly
        const fmap = new NewMap(this, this.findMat(inputData), this.findData(inputData));
        
        // Check if the combined array at index i is 1
        if (combined[i] === 1) {
            this.Maps.push(fmap);
        }
    }
        
        /*this.Maps1 = [];
        this.Maps2 =[];
        let fmap = new NewMap(this,this.findMat(input_data_1),this.findData(input_data_1));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_2),this.findData(input_data_2));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_3),this.findData(input_data_3));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_4),this.findData(input_data_4));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_5),this.findData(input_data_5));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_6),this.findData(input_data_6));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_7),this.findData(input_data_7));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_8),this.findData(input_data_8));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_9),this.findData(input_data_9));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_10),this.findData(input_data_10));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_11),this.findData(input_data_11));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_12),this.findData(input_data_12));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_13),this.findData(input_data_13));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_14),this.findData(input_data_14));
        this.Maps2.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_15),this.findData(input_data_15));
        this.Maps1.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_16),this.findData(input_data_16));
        this.Maps2.push(fmap)
        fmap = new NewMap(this,this.findMat(input_data_17),this.findData(input_data_17));
        this.Maps1.push(fmap);
        fmap = new NewMap(this, this.findMat(input_data_18), this.findData(input_data_18));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_19), this.findData(input_data_19));
        this.Maps1.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_20), this.findData(input_data_20));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_21), this.findData(input_data_21));
        this.Maps1.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_22), this.findData(input_data_22));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_23), this.findData(input_data_23));
        this.Maps1.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_24), this.findData(input_data_24));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_25), this.findData(input_data_25));
        this.Maps1.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_26), this.findData(input_data_26));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_27), this.findData(input_data_27));
        this.Maps1.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_28), this.findData(input_data_28));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_29), this.findData(input_data_29));
        this.Maps2.push(fmap);

        fmap = new NewMap(this, this.findMat(input_data_30), this.findData(input_data_30));
        this.Maps1.push(fmap);

        this.Maps=[];
        if (this.counter % 2 === 0) {
            this.Maps = this.Maps1; // Assign Maps to Maps1 if counter is even
        } else {
            this.Maps = this.Maps2; // Assign Maps to Maps2 if counter is odd
        }
        
        // Increment the counter
        this.counter++;
*/
        //current Map index
        this.currentMap = 0; 
        this.id=0;
        
        /**
         * Initializations of different variables 
         * and classes. All of the Declarations 
         * are self-recognisable.
         */

        this.finalCustomerSelected = [];
        this.finalCarSelected = []; 
        this.finalSelected = [];
        this.customerWaitingTime = [];
        this.customerDestination=[];
        this.carDestination=[];
        this.customerColor = [];
        this.carColor = []; 
        this.carWaitingTime = [];
        this.customerCoord = [];
        this.carCoord = [];
        this.Maps[0].show(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.GameHandler = new GameHandler(this);
        this.GameHandler.promptWaitTimeCustomer();
        this.GameHandler.promptWaitTimeCar();
        this.InteractiveHandler = new InteractiveHandler(this,this.GameHandler);
        this.SocketHandler = new SocketHandler(this,this.GameHandler);
        this.updateTime = 0;
        this.inputCount = 0;
        this.mapCount = 0;

        this.customerTimeText = [null, null ,null];
        this.carTimeText = [null, null ,null];

        // this.hideBlueText = false;
        // this.hideRedText = false;
        // this.hideYellowText = false;

        this.hideCustomerText = [true, true, true];
        this.hideCarText = [true, true, true];
        // let tot = this.Maps[0].data["colorID"].length;

        for(let i=0;i<this.customerWaitingTime.length;i++){
            this.hideCustomerText[i] = false;
        }
        for(let i=0;i<this.carWaitingTime.length;i++){
            this.hideCarText[i] = false;
        }

        this.sceneTime = 112; // changed this from 31 to 61 -- first scene time
        this.timeRemainingSign = this.add.text(2,2, 'Time Remaining: ').setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold');
        this.timeRemainingSignEnd = this.add.text(282,2, 'sec').setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold');
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.updateWaitTime();
        this.addInstrText();
        this.hideSignText = false;

        // this.instrRect = this.add.rectangle(1614,998,170,36,0xffffff);
        // this.instrRect.setStrokeStyle(2, 0x000000);

        this.InstrButton = this.add.text(400,2, 'Instructions').setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000').setFontStyle('bold')
        .setInteractive()
        .on('pointerdown', () => {
            this.hideSignText = !this.hideSignText;
            if(this.sign!=null){
                this.sign.destroy();
                this.bgd.destroy();
                this.help.destroy();
                this.CloseButton.destroy();
                this.closeRect.destroy();
            }
            if(!this.hideSignText){
                this.addInstrText();
            }
            // this.InstrButton.visible = false;
        })
        .on('pointerover', () => this.InstrButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.InstrButton.setStyle({ fill: '#FF0000' }));
            

        let sentences = [
            "Peak hour with so many incoming requests !",
            "It's an average income hour with a standard number of incoming requests.",
            "It is sadly a dull hour with very few incoming requests :("
        ];
        let inputNumber = this.Maps[this.currentMap].data["Scenario"]
        this.mapCountText1 = this.add.text(7,40, (this.currentMap + 1) + '/15' ).setFontSize(28).setFontFamily('Trebuchet MS').setColor('#753422').setFontStyle('bold');
       // this.mapCountText1 = this.add.text(7,55,this.Maps[this.currentMap].data["Id"] ).setFontSize(28).setFontFamily('Trebuchet MS').setColor('#753422').setFontStyle('bold');
        this.id=this.Maps[this.currentMap].data["Id"];
        if (inputNumber >= 0 && inputNumber < sentences.length) {
            let selectedSentence = sentences[inputNumber];
        
            // Add the text starting from the leftmost side
            this.add.text(20, this.scale.height-35, selectedSentence, { 
                font: 'bold 30px Arial', // Set to bold Arial with size 30px
                color: '#000000' // Black text
            }).setOrigin(0, 0.5); // Align to the left and center vertically
        }
        this.updateText();
        if(this.hideSignText) this.updateWaitTime();

        this.prev_time = this.time.now;
    }

    

    /**
     * This the update functoin of a Phaser Scene.
     * It is use to update the scene with time, It
     * is right now only used for the countdown Timer.
     * Previously It was also used for updating the 
     * wait-times for the customers.
     */
    update()  {

        if (this.time.now - this.prev_time >= 1000)
        {
            this.prev_time = this.time.now;
            this.updateText;
            if(this.hideSignText) this.updateWaitTime();
        }

        if (Phaser.Input.Keyboard.JustDown(this.enter) && this.currentlySelectedCustomer!=null && this.currentlySelectedCar!=null)
        {
            console.log('Path Selected!!');
            this.socket.emit("selectedCustomer",this.currentlySelectedCar,this.currentlySelectedCustomer);
        }
    }
}
