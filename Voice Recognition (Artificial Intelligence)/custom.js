const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

const greetings = [
    "I'm good you little piece of shit",
    "Doing good man",
    "Leave me alone"
];

const weather = ["Weather is fine", "why do you care? You never leave the house anyway"];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log("Voice is activated");
};

recognition.onresult = function(event){
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;
    readOutLoud(transcript);
   
};

btn.addEventListener("click", ()=>{
    recognition.start();
});

function readOutLoud (message){
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I don't know what you said";

    if(message.includes("how are you")){
        const finalText = 
        greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    else if(message.includes("how's the weather")){
        const finalText2 =
        weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText2;
    }
    
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
