import { getRandomFood } from "../modules/GetRandomFood";

describe("GetRandomFood", () => {
    it("should return a string", async () => {
        const data = await getRandomFood("");
        expect(data).toEqual(expect.any(String));
    })
})