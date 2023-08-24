import {connectToDatabase} from "@utils/database.js";

import Prompt from "@models/prompt.js";

export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    //connect to db
    try {
        await connectToDatabase();

        //create new prompt

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        const promptCreated = await newPrompt.save();

        console.log(promptCreated);
        return new Response(JSON.stringify(promptCreated), 201);
    } catch (error) {
        return new Response(`Failed to create new prompt. ${error}`);
    }
}