import { getStyledText, getToneSuggestion } from "./ApiRequest"

export const getResult = async ({content, type, context}) => {

    switch(type) {
        case "style": return getStyledText(content, context);
        case "vocab": return getToneSuggestion(content, context);
        default: return "Invalid type";
    
    }
};