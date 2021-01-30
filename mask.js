const URL = "https://teachablemachine.withgoogle.com/models/4HKpdveP0/";
let model, webcam, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}
v

async function predict() {

    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    }
    
     
        if(prediction[0].className =="Without Mask" &&  prediction[0].probability.toFixed(2)>0.6){
            document.getElementById("msg").innerHTML = "Please wear a mask";
            
        }
        else if(prediction[1].className =="With Mask" &&  prediction[1].probability.toFixed(2)>0.6){
            
            document.getElementById("msg").innerHTML = "You are safe to go";
        }
       
}
