import { useState, useEffect, useCallback } from 'react';

const useSpeechRecognition = (
  setMessage: (value: string) => void,
  getMessage: () => string
) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  const startListening = useCallback(() => {
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
      recognition.abort();
    };
    setListening(true);
    recognition.start();
  }, [getMessage, recognition, setMessage]);

  const stopListening = useCallback(() => {
    if (recognition) recognition.stop();
    setListening(false);
  }, [recognition]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window && recognition === null) {
      const newRecognition = new webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.lang = 'en-NG';
      setRecognition(newRecognition);
    }
  }, [recognition]);

  return {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition
  };
};

export default useSpeechRecognition;
