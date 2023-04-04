const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise(res => {
    if (!speechSynthesis) return res([]);

    // in Google Chrome the voices are not ready on page load
    if (speechSynthesis && speechSynthesis.getVoices().length < 1) {
      speechSynthesis.onvoiceschanged = () => res(speechSynthesis.getVoices());
    } else {
      res(speechSynthesis.getVoices());
    }
  });
};

export { loadVoices };
