const { _saveQuestionAnswer, _saveQuestion } = require("../utils/_DATA");
describe("_saveQuestionAnswer", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should return error for false parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});

describe("_saveQuestion", () => {
    // it("should return saved question with all fields filled when correct data is passed", async () => {
    //     const questionData = {
    //         optionOneText: "test",
    //         optionTwoText: "test",
    //         author: "sarahedo"
    //     };

    //     const savedQuestion = await _saveQuestion(questionData);
    //     expect(savedQuestion).toMatchObject({
    //         id: expect.any(String),
    //         timestamp: expect.any(Number),
    //         author: "sarahedo",
    //         optionOne: {
    //             text: "test",
    //             votes: expect.any(Array)
    //         },
    //         optionTwo: {
    //             text: "test",
    //             votes: expect.any(Array)
    //         }
    //     });
    // });

    it("should return error if incorrect data is passed into the function", async () => {
        const invalidQuestionData = {
            optionOneText: "rent new office",
            optionTwoText: "rent old office",
            author: ""
        };

        await expect(_saveQuestion(invalidQuestionData)).rejects.toBe("Please provide optionOneText, optionTwoText, and author");
    });
});