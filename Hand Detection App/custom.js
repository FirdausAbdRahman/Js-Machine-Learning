const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  
// accessing webcam
navigator.getUserMedia = navigator.getUserMedia || 
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

let model;

//start webcam video stream on given video element
handTrack.startVideo(video)
.then(status => {
    if(status){
        navigator.getUserMedia({video: {}}, stream => {
            video.srcObject = stream;
            setInterval(runDetection, 10);
        },
        err => console.log(err)
        );
    }
});

function runDetection(){
    model.detect(video)
   // predictions are an array of results from the detect() method
    .then(predictions => {
        console.log(predictions);

    //draw bounding box (and the input mediasource image) on the specified canvas
    model.renderPredictions(predictions, canvas, context, video);
        if(predictions.length > 0) {
            audio.play();
        }
    });
}

//loading the model
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});
