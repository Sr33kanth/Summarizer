import {Configuration, OpenAIApi} from 'openai'

/**
 * Method to call openAI with the prompt value
 * @param {*} promptValue 
 * @returns Text generated by the API
 */
export const openAIChatWrapper = async (promptValue) => {

    const configuration = new Configuration({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY});
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: process.env.NEXT_PUBLIC_OPENAI_API_MODEL,
        messages: [{ "role": "assistant", "content": "You are a helpful assistant." }, { role: "user", content: promptValue }],
    });

    return completion.data.choices[0].message.content;
};

/**
 * Method to get styled text from OpenAI
 * @param {*} content 
 * @param {*} context 
 * @returns  Styled text returned by API
 */
export const getStyledText = async (content, context) => {
    var promptValue  = "Below content is part of a writing article."
    switch(context) {
        case "summarize":
            promptValue += `Summarize the below content. \n "${content}"`;
            break;
        case "vocab":
            promptValue += `Provide some good vocabulary suggestions for the below content as a list of words with their mapping from existing words in article. \n "${content}"`;
            break;
        case "improve":
            promptValue += `Improve the below content by making it even better. \n "${content}"`;
            break;
        default:
            return content;
    }
    const styledContent = openAIChatWrapper(promptValue);
    return styledContent;
}

/**
 * Method to get tone suggestion
 * @param {*} content 
 * @param {*} context 
 * @returns 
 */
export const getTonesSuggestion = async (content, context) => {
    const tonePrompt = `Paraphrase below text in ${context} tone. \n "${content}"`
    const toneContent = openAIChatWrapper(tonePrompt);
    return toneContent;
};

export default openAIChatWrapper;