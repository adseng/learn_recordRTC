import {useRef} from "react";
import RecordRTC, {invokeSaveAsDialog} from "recordrtc";

function App2() {

    const boxRef = useRef<HTMLDivElement>(null);

    const recorderRef = useRef<RecordRTC>();

    async function startRecoder() {
        // 获取屏幕流
        navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
            .then((screenStream) => {
                // 初始化 RecordRTC
                const recorder = new RecordRTC(screenStream, {
                    type: 'video',
                    mimeType: 'video/webm', // 或 'video/mp4' 如果浏览器支持
                    recorderType: RecordRTC.MediaStreamRecorder,
                    // numberOfAudioChannels: 1,
                });

                // 开始录制
                recorder.startRecording();

                recorderRef.current = recorder;
            })
            .catch((error) => {
                console.error('Error accessing screen:', error);
            });
    }

    async function stopRecoder() {
        if (recorderRef.current == null) {
            return
        }

        await recorderRef.current.stopRecording();
        const blob = await recorderRef.current.getBlob();
        invokeSaveAsDialog(blob, 'test.mp4');
    }

    // function addStreamStopListener(stream, callback) {
    //     stream.addEventListener('ended', function() {
    //         callback();
    //         callback = function() {};
    //     }, false);
    //     stream.addEventListener('inactive', function() {
    //         callback();
    //         callback = function() {};
    //     }, false);
    //     stream.getTracks().forEach(function(track) {
    //         track.addEventListener('ended', function() {
    //             callback();
    //             callback = function() {};
    //         }, false);
    //         track.addEventListener('inactive', function() {
    //             callback();
    //             callback = function() {};
    //         }, false);
    //     });
    // }

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh'
            }}
            ref={boxRef}>

            <button onClick={() => {
                startRecoder()
            }}>开始
            </button>

            <button onClick={() => {
                stopRecoder()
            }}>结束
            </button>

        </div>
    );
}

export default App2;
