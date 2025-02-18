import { dataJSON } from "./dataService.js";
let data = dataJSON;

// p5 instance mode
const s = ( p ) => {
    let font;

    let canvasWidth = window.innerWidth - 30;
    let canvasHeight = window.innerHeight - 40;

    let backgroundColor = "black";
    let mainColor = "white";
    let subColor = "white";

    // Options
    /*mainColor = "rgb(100, 200, 200)";
    mainColor = "rgba(255, 0, 200, 0.87)";
    mainColor = "rgba(0, 123, 255, 0.89)";

    // Theme: Monochrome x Fantasia
    backgroundColor = "rgb(200, 200, 200)";
    mainColor = "white";
    subColor = "rgba(0, 123, 255, 0.89)";

    // Theme: Neon dark
    backgroundColor = "black";
    mainColor = "rgb(225, 225, 113)";
    subColor = "rgba(0, 123, 255, 0.89)";*/

    let themeMonoDark = {
        backgroundColor: "black",
        mainColor: "white",
        subColor: "white"
    }
    let themeMonoLight = {
        backgroundColor: "white",
        mainColor: "white",
        subColor: "white"
    }
    let themeNeonDark = {
        backgroundColor: "black",
        mainColor: "rgb(225, 225, 113)",
        subColor: "rgba(0, 123, 255, 0.89)"
    };
    let themes = [themeMonoDark, themeMonoLight, themeNeonDark];
    let currentTheme = 0;

    // Editable draw variables
    let scaleX = 0.8;
    let scaleY = 1;
    let gapY = 0;

    // Animation modes (turn on/off by button)
    let modeScaleX = false;
    let modeScaleY = false;

    let notesOn = false; // show notes?
    let preserve = false; // layer canvas when switching themes?

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.blendMode(p.DIFFERENCE);
        p.background(backgroundColor);
        p.noStroke();

        p.textStyle(p.BOLD);
        if (font) {
            p.textFont(font);
        } else {
            p.textFont('Courier New');
        }

        /* Place buttons */
        let btnStartY = 20;
        let btnGapY = 30;
        let btnTempNum = 0;

        // Clear canvas button
        let btn = p.createButton('-CORRUPT');
        btn.position(canvasWidth - 70, btnStartY + btnGapY * btnTempNum);
        btn.mousePressed(() => {
            // turn on mode scale Y
            modeScaleY = true;
        });
        btnTempNum++;

        let btn2 = p.createButton('-DESTROY');
        btn2.position(canvasWidth - 70, btnStartY + btnGapY * btnTempNum);
        btn2.mousePressed(() => {
            // turn on mode scale Y
            modeScaleX = true;
        });
        btnTempNum++;

        let btn3 = p.createButton('-SHIFT');
        btn3.position(canvasWidth - 70, btnStartY + btnGapY * btnTempNum);
        btn3.mousePressed(() => {
            // Toggle theme
            currentTheme = (currentTheme + 1) % themes.length;
            backgroundColor = themes[currentTheme].backgroundColor;
            mainColor = themes[currentTheme].mainColor;
            subColor = themes[currentTheme].subColor;

            if (!preserve) {
                // Reset canvas
                p.clear();
                p.background(backgroundColor);
            }

            // Redraw graphics
            drawData();
        });
        btnTempNum++;

        let btn4 = p.createButton('-REVEAL');
        btn4.position(canvasWidth - 70, btnStartY + btnGapY * btnTempNum);
        btn4.mousePressed(() => {
            // Toggle text mode
            notesOn = !notesOn;

            if (!preserve) {
                // Reset canvas
                p.clear();
                p.background(backgroundColor);
            }

            // Redraw graphics
            drawData();
        });
        btnTempNum++;

        let btn5 = p.createButton('-PRESERVE');
        btn5.position(canvasWidth - 70, btnStartY + btnGapY * btnTempNum);
        btn5.mousePressed(() => {
            // Toggle preserve
            preserve = !preserve;
        });
        btnTempNum++;

        drawData();
    }

    // Scale function
    function scaleTime(timeString, maxTime, maxScaled) {
        let timeScaled = (Number(timeString.split(":")[0]) * 60 + Number(timeString.split(":")[1])) / maxTime * maxScaled;
        return timeScaled;
    }

    p.draw = async () => {
        // Animate based on mode
        if (modeScaleX) {
            scaleX += 0.05;
            drawData();
        }
        if (modeScaleY) {
            scaleY += 0.1;
            drawData();
        }
    }

    function drawData() {
        /* Draw barcode graphics from data */

        let lineNum = 0; // for splitting days into lines vertically
        let lastDate = "";
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            let obj = data[i];

            p.fill(mainColor);
            if (obj.type === "P") {
                // In person
                p.fill(mainColor);
            } else {
                // Online
                p.fill(subColor);
            }

            // Process date-time strings
            let date = obj.time.split("T")[0];
            let time = obj.time.split("T")[1];
            let length = obj.length.split("-")[0];

            // Update line number
            if (i !== 0 && date !== lastDate) {
                lineNum++;
            }
            lastDate = date;

            // Scale time and length to fit points in canvas
            let maxTime = 24 * 60; // in seconds
            let maxScaled = canvasWidth; // maximum x value to scale to
            let timeScaled = scaleTime(time, maxTime, maxScaled);
            let lengthScaled = scaleTime(length, maxTime, maxScaled);

            // Calculate size and position based on time
            let width = lengthScaled * scaleX;
            let height = canvasHeight / 7 * scaleY;
            let posX = timeScaled * scaleX + 10;
            let posY = lineNum * height + gapY + 10; //10 + 4 * i;

            // x, y, width, height
            p.rect(posX, posY, width, height);

            // Check text mode
            if (notesOn) {
                // Display notes
                p.textSize(10);

                p.textAlign(p.RIGHT, p.BOTTOM);
                p.text(obj.notes, posX + width, posY + height);
            } else {
                // Don't disply notes
                p.textSize(5);
            }

            // Draw text label
            p.textAlign(p.RIGHT, p.BOTTOM);
            p.text(obj.name.substring(0, 2), posX, posY);

            if (obj.type === "P") {
                // In person
                //p.fill(mainColor);
            } else {
                // Online
                // Draw line above
                p.rect(posX, posY - 5, width, 2);
            }
        }
    }
}

let mainCanvas = new p5(s);