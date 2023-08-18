import * as FfmpegCommand  from "fluent-ffmpeg";
import * as Path from "path";

export class FfmpegClient {
    public async convertToWav(directory: string, title: string): Promise<string> {
        let tempDirectory =  Path.join(__dirname, `../temp_folder/${title}Temp.wmv`);
        try {
            await FfmpegCommand(directory)
            .format('wav')
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .saveToFile(tempDirectory)
            .on("end", () => {
                console.log('Processing finished !');
             });        
        } 
        catch(error) {
            console.log(error);
        }
        return tempDirectory;
    }
}