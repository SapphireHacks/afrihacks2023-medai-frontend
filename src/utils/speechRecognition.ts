import { useState } from 'react';

let recognition: any = null;
if (
  global?.window &&
  window.innerHeight &&
  'webkitSpeechRecognition' in window
) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-NG';
}

const useSpeechRecognition = (
  setMessage: (value: string) => void,
  getMessage: () => string
) => {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!recognition) return;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setText(prevText => prevText + ' ' + transcript);
      setMessage(getMessage() + ' ' + transcript);
      recognition.stop();
      setListening(false);
    };
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
    setListening(false);
  };

  return {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition
  };
};

export default useSpeechRecognition;
