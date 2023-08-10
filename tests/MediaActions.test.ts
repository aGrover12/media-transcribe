import { test, expect } from '@jest/globals';
import { MediaAcitons } from "../services/MediaActions";
import { StubRepository } from '../repositories/StubRepository';
import { Media } from '../models/media';

let repository: StubRepository = new StubRepository();
let mediaActions: MediaAcitons = new MediaAcitons(repository);

test('uploads media to repository', () => {
    let media: Media = new Media({
        id: 1,
        title: "Test_Name",
        directory: "Not/Real/Directory"
    });

    mediaActions.uploadMedia(media);
    let retrievedMedia: Media = mediaActions.retrieveMedia(media.id);

    expect(repository.meidaInformation.includes(retrievedMedia))     
});