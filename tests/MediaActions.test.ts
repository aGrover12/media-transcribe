import { test, expect } from '@jest/globals';
import { MediaAcitons } from "../services/MediaActions";
import { StubRepository } from '../repositories/StubRepository';
import { Media } from '../models/Media';
import { RetrieveMediaResult } from '../models/RetrieveMediaResult';
import { Results } from '../constants/Results';

let repository: StubRepository = new StubRepository();
let mediaActions: MediaAcitons = new MediaAcitons(repository);

let media: Media = new Media({
    id: 1,
    title: "Test_Name",
    directory: "Not/Real/Directory"
});

afterEach(() => {
    jest.resetAllMocks();
    repository.meidaInformation = [];
});

test('Uploads media to repository', () => {
    let result = mediaActions.insertMedia(media);
    let retrievedMediaResult: RetrieveMediaResult = mediaActions.retrieveMedia(media.id);
    
    expect(repository.meidaInformation).toContain(retrievedMediaResult.media);
    expect(result.successful).toBeTruthy();
    expect(result.message).toMatch(Results.SUCCESS);
});

let error: string = 'This is a test';

test('Fails to upload media to repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'Insert');
    mock.mockImplementation(() => { throw error });
   
    let result = mediaActions.insertMedia(media);
    mock.mockClear();

    expect(result.successful).toBeFalsy();
    expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
});

test('Retrieve media from repository', () => {
    mediaActions.insertMedia(media);
    let retrievedMediaResult: RetrieveMediaResult = mediaActions.retrieveMedia(media.id);
    
    expect(repository.meidaInformation).toContain(retrievedMediaResult.media);
    expect(retrievedMediaResult.successful).toBeTruthy;
    expect(retrievedMediaResult.message).toMatch(Results.SUCCESS);
});

test('Fails to retrieve media from repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'Retrieve');
    mock.mockImplementation(() => { throw error });

    mediaActions.insertMedia(media);
    let result: RetrieveMediaResult =  mediaActions.retrieveMedia(media.id);
    
    expect(repository.meidaInformation.includes(result.media)).toBeFalsy();
    expect(result.successful).toBeFalsy();
    expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
});

test('Retrieve comes back empty', () => {
    let result: RetrieveMediaResult = mediaActions.retrieveMedia(media.id);
    expect(result.media).toBeUndefined();
    expect(result.successful).toBeFalsy();
    expect(result.message).toEqual(`${Results.FAILURE}: Media not found`);
})