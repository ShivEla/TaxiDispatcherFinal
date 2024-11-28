/**
 * This clas handles the interaction between the user
 * and the game. This function in the current version, 
 * just controls the interaction for the first scene, 
 * for rest of scenes the interaction is handled in 
 * socket handle itself. 
 */

export default class InteractiveHandler{
    constructor(scene, GameHandler){

        this.GameHandler = GameHandler;
        scene.currentlySelectedCar = null;
         
        scene.nextButton.on('pointerdown', () => {
            let mxidx = Math.min(scene.carWaitingTime.length, scene.customerWaitingTime.length);
            console.log("Mxidx", mxidx);
            console.log('Count: ', scene.inputCount);
            if(scene.inputCount!=mxidx){
                // this.scene.start("Instruction");
                this.GameHandler.promptMessage('Match cabs and customers!');
            }else{
                for(let i=0;i<scene.customerWaitingTime.length;i++){
                    if(this.GameHandler.waitingCustomer[i]!=null){
                        this.GameHandler.waitingCustomer[i].destroy();
                    }
                    if(scene.customerTimeText[i]!=null){
                        scene.customerTimeText[i].destroy();
                    }
                }
                for(let i=0;i<scene.carWaitingTime.length;i++){
                    if(this.GameHandler.waitingCar[i]!=null){
                        this.GameHandler.waitingCar[i].destroy();
                    }
                    if(scene.carTimeText[i]!=null){
                        scene.carTimeText[i].destroy();
                    }
                }
                scene.socket.emit('NextScene', scene.socket.id, scene.finalSelected);
            }

            console.log('Clicked');
        })

        scene.nextButton.on('pointerover', () => {
            scene.nextButton.setColor('#f39c12');
        })

        scene.nextButton.on('pointerout', () => {
            scene.nextButton.setColor('#FF0000');
        })

        /* *

        */

        scene.clearButton.on('pointerdown', () => {
            
            scene.inputCount = 0;
            this.GameHandler.dots = [];
            this.GameHandler.carId = null;
            this.GameHandler.customerId = null;
            this.GameHandler.infoDist = null;
            this.GameHandler.pathButton = null;
            this.GameHandler.selectedCar = null;
            this.GameHandler.selectedCustomer = null;
            this.GameHandler.waitingCar = [null, null, null];
            this.GameHandler.waitingCustomer = [null, null, null];
            this.GameHandler.promptWaitTimeCustomer();
            this.GameHandler.promptWaitTimeCar();
            this.GameHandler.removeOutputPath();
            this.GameHandler.promptMessageText = null;
            scene.hideCustomerText = [true, true, true];
            scene.hideCarText = [true, true, true];

            scene.currentlySelectedCar = null;
            scene.currentlySelectedCustomer = null;
            scene.finalCustomerSelected = [];
            scene.finalCarSelected = [];
            scene.finalSelected = [];

            for(let i=0;i<scene.customerWaitingTime.length;i++){
                scene.hideCustomerText[i] = false;
                scene.Maps[scene.currentMap].customers[i].instance.setInteractive();
                
                let customerSelected1 = scene.Maps[scene.currentMap].customers[i];
                let v2 = scene.add.image(customerSelected1.screenX,customerSelected1.screenY, 'customer'+i);
                v2.setScale(scene.scalefactor);

                if(!scene.hideCustomerText[i]){
                    let tmp = scene.customerWaitingTime[i] + " min";
                    let dx = scene.customerCoord[i][0];
                    let dy = scene.customerCoord[i][1];
                    if(scene.customerTimeText[i] != null){
                        scene.customerTimeText[i].destroy();
                    } 
                    scene.customerTimeText[i] = scene.add.text(24 + (dx - 1.5) * 72, 64 + (dy - 2) * 56,tmp).setFontSize(28).setFontStyle('bold').setFontFamily('Trebuchet MS').setColor('#FFFFFF');
                }
            }
            for(let i=0;i<scene.carWaitingTime.length;i++){
                scene.hideCarText[i] = false;
                scene.Maps[scene.currentMap].cars[i].instance.setInteractive();

                let carSelected = scene.Maps[scene.currentMap].cars[i];
                let v1 = scene.add.image(carSelected.screenX,carSelected.screenY, 'car'+i);
                v1.setScale(scene.scalefactor);

                if(!scene.hideCarText[i]){
                    let tmp = scene.carWaitingTime[i] + " min";
                    let dx = scene.carCoord[i][0];
                    let dy = scene.carCoord[i][1];
                    if(scene.carTimeText[i] != null) {
                        scene.carTimeText[i].destroy();
                    }
                    scene.carTimeText[i] = scene.add.text(24 + (dx - 1.5) * 72, 64 + (dy - 2) * 56,tmp).setFontSize(28).setFontStyle('bold').setFontFamily('Trebuchet MS').setColor('#FFFFFF');
                }
            }

        })

        scene.clearButton.on('pointerover', () => {
            scene.clearButton.setColor('#f39c12');
        })

        scene.clearButton.on('pointerout', () => {
            scene.clearButton.setColor('#FF0000');
        })

        /**
         * This part of code, handles the logic for selection of
         * path and the sending of information from client to server
         * using sockets, as defined in SocketHandler.js 
         */
            

        for(let i=0; i< scene.Maps[scene.currentMap].cars.length; i++){
            scene.Maps[scene.currentMap].cars[i].instance.on('pointerdown', () => {   
                this.GameHandler.hideAnyPath(); 
                this.GameHandler.removeOutputPath();
                this.GameHandler.removeSelectedCustomer();
                this.GameHandler.promptMessageText = null;
                scene.socket.emit("selectedCar", i);
                if(scene.currentlySelectedCar==null){
                    this.GameHandler.drawSelectedCar(i);
                    // this.GameHandler.hideCustomers();
                    // this.GameHandler.createDots();
                    scene.currentlySelectedCar = i;
                    // scene.socket.emit('createDots');
                }else{
                    this.GameHandler.removeSelectedCar();
                    if(scene.currentlySelectedCar==i){
                        scene.currentlySelectedCar = null;
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.showCustomers();
                    }else{
                        this.GameHandler.drawSelectedCar(i);
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.createDots();
                        scene.currentlySelectedCar = i;
                        // scene.socket.emit('createDots');
                    }
                }
                console.log('Clicked car index: '+ i);
                this.GameHandler.hideAnyPath();
                this.GameHandler.removeOutputPath();
                if(scene.currentlySelectedCustomer!=null){
                    scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(scene.currentlySelectedCustomer);
                    this.GameHandler.promptOutputPath(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                    this.GameHandler.handleButton(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                }
            })
        }



        for(let i=0; i< scene.Maps[scene.currentMap].customers.length; i++){
            console.log('Customers: ', i);
            scene.Maps[scene.currentMap].customers[i].instance.on('pointerdown', () => {
                scene.currentlySelectedCustomer = i;
                console.log('Clicked customer index: (Here) '+ i);
                this.GameHandler.removeSelectedCustomer();
                this.GameHandler.drawSelectedCustomer(i);
                this.GameHandler.hideAnyPath();
                this.GameHandler.removeOutputPath();
                if(scene.currentlySelectedCar!=null){
                    scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(scene.currentlySelectedCustomer);
                    this.GameHandler.promptOutputPath(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                    this.GameHandler.handleButton(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                }
            })
        }

        // ------------------ //
        
    }
}