/**
 * This class starts the basic UI on the screen
 * which includes the text boxes, grid and the 
 * different prompts.
 */
// latest version
export default class UIHandler{
    constructor(scene){

        /**
         * This function creates the instance for text "Next Map"
         */
        this.buildGameText = () => {
            scene.nextButton = scene.add.text(1740,2,"Next-Map").setFontStyle('bold').setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000');
            scene.clearButton = scene.add.text(1490,2,"Clear-Selection").setFontStyle('bold').setFontSize(28).setFontFamily('Trebuchet MS').setColor('#FF0000');
            // scene.closeButton = scene.add.text(1380,600,"Close").setFontSize(20).setFontFamily('Trebuchet MS');
        }
        /**
         * This function builds the rectangle background for the prompts
         */

        // this.buildPrompt = () => {
        //     scene.promptBoxHeader = scene.add.text(1510,580,"Information Box").setFontSize(28).setFontFamily('Trebuchet MS').setColor('#E84545').setFontStyle('bold');
        //     scene.promptScreen = scene.add.rectangle(1610,760,596,300);
        //     scene.promptScreen.setStrokeStyle(4, 0x48466D);
        // }

        /**
         * This function bult the rectangular background 
         * for the waiting time prompt.
         */
        // this.buildWaitingTimePrompt = () => {
        //     scene.promptBoxHeader = scene.add.text(1370,120,"Waiting time of customers and cabs").setFontSize(28).setFontFamily('Trebuchet MS').setColor('#E84545').setFontStyle('bold');
        //     scene.waitTimePrompt = scene.add.rectangle(1610,360,596,400);
        //     scene.waitTimePrompt.setStrokeStyle(4, 0x48466D);
        // }

        this.buildLinks = () => {
            scene.ImprintLink = scene.add.text(1660,900, 'Imprint').setFontSize(20).setFontFamily('Trebuchet MS').setColor('#FFFFFF').setInteractive();
            scene.DataProtLink = scene.add.text(1760,900, 'Data Protection').setFontSize(20).setFontFamily('Trebuchet MS').setColor('#FFFFFF').setInteractive();

            scene.ImprintLink.on('pointerup', openExternalLink, scene);
            scene.DataProtLink.on('pointerup', openExternalLink1, scene);
        }

        function openExternalLink(){
            var url = 'https://imprint.mpi-klsb.mpg.de/sws/taxi-dispatcher.mpi-sws.org';
            var s = window.open(url, '_blank');
            if (s && s.focus){
                s.focus();
            }
            else if (!s){
                window.location.href = url;
            }
        }

        function openExternalLink1(){
            var url = 'https://data-protection.mpi-klsb.mpg.de/sws/taxi-dispatcher.mpi-sws.org';
            var s = window.open(url, '_blank');
            if (s && s.focus){
                s.focus();
            }
            else if (!s){
                window.location.href = url;
            }
        }

        /**
         * This the master function to call all the above function
         *  to create the basic UI.
         */
        this.buildUI = () => {
            this.buildGameText();
            // this.buildPrompt();
            // this.buildWaitingTimePrompt();
            this.buildLinks();
        }
    }
}