// p5 instance mode
const s = ( p ) => {
    let font;

    function connectBtnClick() {
        console.log("hi");
    }

    p.setup = () => {
        p.createCanvas(800, 600);
        p.background(250);
        p.textSize(20);
        p.textStyle(p.BOLD);
        if (font) {
            p.textFont(font);
        } else {
            p.textFont('Courier New');
        }

        // any other ports can be opened via a dialog after
        // user interaction (see connectBtnClick below)
        let connectBtn = p.createButton('Connect to Arduino');
        connectBtn.position(700, 200);
        connectBtn.mousePressed(connectBtnClick);

        // Clear canvas button
        let clearCanvasBtn = p.createButton('Clear canvas');
        clearCanvasBtn.position(700, 260);
        clearCanvasBtn.mousePressed(() => {
            // Reset canvas
            p.clear();
            p.background(250);
            height = 20;
        });

    }

    p.draw = async () => {
        
    }

}

let mainCanvas = new p5(s);