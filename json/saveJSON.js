import { mkdir, writeFile } from 'fs/promises';
import path from "path";

async function saveToJSON (file_name, data) {

    const absolutePath = path.resolve("data"); // get absolute path
    await mkdir(absolutePath, {recursive: true}); //mkdir without or with parents folders
    const filePath = path.join(absolutePath, file_name); // whole path

    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8"); //without secret, 2 space, ru utf-8
    
    return filePath;

};

export default saveToJSON;