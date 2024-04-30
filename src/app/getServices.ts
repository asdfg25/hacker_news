import BaseURL from "./BaseURL";
import { IComment } from "./types/StoryTypes";

export const getTopStories = async () => {
    try {
        const { data } = await BaseURL.get<number[]>(`topstories.json`);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getStory = async (storyId: number) => {
    try {
        const { data } = await BaseURL.get<IComment>(`item/${storyId}.json`);
        return data;
    } catch (error) {
        console.error(`Error fetching story ${storyId}:`, error);
        return null;
    }
};

export const getAllComments = async (id:number) => {
    try {
        const { data } = await BaseURL.get<IComment>(`item/${id}.json`);
        if (data.kids) return data.kids
        return []
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getComm = async (storyId: number) => {
    try {
        const { data } = await BaseURL.get<IComment>(`item/${storyId}.json`);
        return data
    } catch (error) {
        console.error(`Error fetching story ${storyId}:`, error);
        return null;
    }
};