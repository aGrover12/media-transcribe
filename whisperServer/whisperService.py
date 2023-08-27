from datetime import timedelta
import os
import whisper

class whisperService:
    def transcribe(path, model, fileName, ln=None):
        fileWithoutExtension = fileName.split(".")[0];
        completePath = path + fileName
        print(fileWithoutExtension)
        print("Loading model.")
        model = whisper.load_model(model) 
        print("Whisper model loaded.")
        transcribe = model.transcribe(audio=completePath, language=ln)
        print("We finished the transcribe")
        segments = transcribe['segments']
        newPath = path + fileWithoutExtension + ".srt";
        for segment in segments:
            startTime = str(0)+str(timedelta(seconds=int(segment['start'])))+',000'
            endTime = str(0)+str(timedelta(seconds=int(segment['end'])))+',000'
            text = segment['text']
            segmentId = segment['id']+1
            segment = f"{segmentId}\n{startTime} --> {endTime}\n{text[1:] if text[0] is ' ' else text}\n\n"

            srtFilename = os.path.join("SrtFiles", newPath)
            with open(srtFilename, 'a', encoding='utf-8') as srtFile:
                srtFile.write(segment)
        return srtFilename;
