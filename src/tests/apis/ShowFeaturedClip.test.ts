import axios from "axios";

describe("ShowFeaturedClip", () => {
    it('Channel is exist and has clip: It should return "filename"and "durationMilliseconds"', async () => {
        const { data } = await axios.get("http://localhost:8082/feature-clip?broadcasterId=135783794");
        expect(data).toHaveProperty('filename');
        expect(data).toHaveProperty('durationMilliseconds');
    })
    it('Channel is exist but has no clip: It should return empty', async () => {
        const { data } = await axios.get("http://localhost:8082/feature-clip?broadcasterId=519032026");
        expect(data).toEqual({ filename: '' });
    })
})