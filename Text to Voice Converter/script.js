let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // Default to the first voice
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i); // Correctly populate the dropdown
    });
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value]; // Use correct array syntax
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value; // Set the text to be spoken
    window.speechSynthesis.speak(speech); // Speak the text
});
