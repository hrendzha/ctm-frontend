import { DEFAULT_VOICE_SETTINGS, LsKeys } from "constants-local";
import { IVoiceSettings } from "interfaces";
import { loadVoices } from "utils";

let voices: SpeechSynthesisVoice[] | null = null;

const speak = async (text: string) => {
  if (!speechSynthesis) return;

  if (speechSynthesis.speaking || speechSynthesis.pending) {
    speechSynthesis.cancel();
    return;
  }

  if (voices === null) {
    voices = await loadVoices();
  }

  const voiceSettingsLs = localStorage.getItem(LsKeys.VoiceSettings);
  const voiceSettings: IVoiceSettings =
    voiceSettingsLs !== null ? JSON.parse(voiceSettingsLs) : DEFAULT_VOICE_SETTINGS;

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
  speechSynthesisUtterance.voice = voices[voiceSettings.voiceIndex];
  speechSynthesisUtterance.rate = voiceSettings.rate;
  speechSynthesisUtterance.pitch = voiceSettings.pitch;

  speechSynthesis.speak(speechSynthesisUtterance);
};

const useSpeechSynthesis = () => {
  return { speak };
};

export { useSpeechSynthesis };
