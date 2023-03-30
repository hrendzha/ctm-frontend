const loadVoices = () => {
  const voices = speechSynthesis.getVoices();
  //   console.log(`voices`, voices);
};

// in Google Chrome the voices are not ready on page load
if (speechSynthesis && speechSynthesis.getVoices().length < 1) {
  speechSynthesis.onvoiceschanged = loadVoices;
} else {
  loadVoices();
}

const speak = (text: string) => {
  if (!speechSynthesis) return;

  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
    return;
  }

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
  // speechSynthesisUtterance.lang = "en-US";
  // speechSynthesisUtterance.onerror = event => {
  //   console.log(`event`, event);
  // };

  speechSynthesis.speak(speechSynthesisUtterance);
};

const useSpeechSynthesis = () => {
  return { speak };
};

export { useSpeechSynthesis };
