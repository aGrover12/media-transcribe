import * as FfmpegCommand  from "fluent-ffmpeg";
import * as Path from "path";

export class FfmpegClient {
    public async convertToWav(directory: string, title: string): Promise<string> {
        let tempDirectory =  Path.join(__dirname, `../temp_folder/${title}Temp.wmv`);
            await FfmpegCommand(directory)
            .format('wav')
            .saveToFile(tempDirectory)
        return tempDirectory;
    }
}