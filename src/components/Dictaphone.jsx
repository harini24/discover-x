import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'font-awesome/css/font-awesome.min.css'

const Dictaphone = (props) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const startListening = () => {
        resetTranscript()
        SpeechRecognition.startListening({ continuous: true });
    }
    const stopListening = () => {
        SpeechRecognition.stopListening({ continuous: true });
        props.setText(transcript)
        resetTranscript()
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <React.Fragment>
            {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            <button
                onTouchStart={startListening}
                onMouseDown={startListening}
                onTouchEnd={stopListening}
                onMouseUp={stopListening}
            ><i className="fa fa-microphone fa-2x" aria-hidden="true"></i></button>
            {/* <p>{transcript}</p> */}
        </React.Fragment>
    );
};
export default Dictaphone;