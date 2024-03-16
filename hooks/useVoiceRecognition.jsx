import { useState, useEffect, useCallback } from "react";
import Voice from "@react-native-voice/voice";

const useVoiceRecognition = () => {
  const [state, setState] = useState({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      isRecording: false,
    });
  }, []);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const destroyRecognizer = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetState();
  }, [resetState]);

  useEffect(() => {
    const onSpeechStart = (e) => {
      setState((prevState) => ({
        ...prevState,
        started: "Recording...",
        isRecording: true,
      }));
    };

    const onSpeechRecognized = () => {
      setState((prevState) => ({ ...prevState, recognized: "√" }));
    };

    const onSpeechEnd = (e) => {
      setState((prevState) => ({ ...prevState, end: "Done", isRecording: false }));
    };

    const onSpeechError = (e) => {
      setState((prevState) => ({
        ...prevState,
        error: JSON.stringify(e.error),
        isRecording: false,
      }));
    };

    const onSpeechResults = (e) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, results: e.value }));
      }
    };

    const onSpeechPartialResults = (e) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, partialResults: e.value }));
      }
    };

    const onSpeechVolumeChanged = (e) => {
      setState((prevState) => ({ ...prevState, pitch: e.value }));
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizer,
  };
};

export default useVoiceRecognition;
