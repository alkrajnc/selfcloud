import { getFolders } from "@/server/api";

export async function GET(request: Request) {
    const folders = await getFolders();

    return Response.json(folders);
}
