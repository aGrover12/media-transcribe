import { test, expect } from '@jest/globals';
import { MediaAcitons } from "../services/MediaActions";
import { StubRepository } from '../repositories/StubRepository';
import { Media } from '../models/Media';

let repository: StubRepository = new StubRepository();
let mediaActions: MediaAcitons = new MediaAcitons(repository);

let media: Media = new Media({
    id: 1,
    title: "Test_Name",
    directory: "Not/Real/Directory"
});

test('uploads media to repository', () => {
    let result = mediaActions.uploadMedia(media);
    let retrievedMedia: Media = mediaActions.retrieveMedia(media.id);
    
    expect(repository.meidaInformation).toContain(retrievedMedia);
    expect(result.successful).toBeTruthy();
    expect(result.message).toMatch("Successful Upload");
});

let error: string = 'This is a test';

test('Fails to upload media to repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'Insert');
    mock.mockImplementation(() => { throw error });
   
    let result = mediaActions.uploadMedia(media);

    expect(result.successful).toBeFalsy();
    expect(result.message).toMatch(error)
});