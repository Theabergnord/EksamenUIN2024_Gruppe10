import { client } from "../client";

export async function fetchAllUsers() {
    const data = await client.fetch(`*[_type == "user"]{
        name,
        "image": poster.asset->url
    }`);
    return data;
}