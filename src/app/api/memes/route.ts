import { poolPromise } from "@/lib/azureClient";
import { FetchMemesResponse } from "@/lib/fetchMemes";
import { MemeType } from "@/lib/types";
import { toCamelCaseKeys } from "@/lib/utils";
import sql from "mssql";

export async function GET(request: Request): Promise<Response> {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (apiKey !== process.env.API_KEY) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "10", 10);
    const offset = (page - 1) * limit;

    const poolConnection = await poolPromise;
    const channel = "memeogvinogklinoggrin2";

    const result = await poolConnection
      .request()
      .input("ChannelName", sql.NVarChar, channel)
      .input("Limit", sql.Int, limit)
      .input("Offset", sql.Int, offset).query(`
        SELECT Id, Name, Author, Username, AuthorImage, Date, Url, Type, Reactions, ChannelName
        FROM MediaFiles
        WHERE ChannelName = @ChannelName
        ORDER BY Date DESC
        OFFSET @Offset ROWS
        FETCH NEXT @Limit ROWS ONLY
      `);

    const countResult = await poolConnection
      .request()
      .input("ChannelName", sql.NVarChar, channel).query(`
        SELECT COUNT(*) AS TotalCount
        FROM MediaFiles
        WHERE ChannelName = @ChannelName
      `);

    const totalCount = countResult.recordset[0].TotalCount;
    const totalPages = Math.ceil(totalCount / limit);

    const parsedRecords: MemeType[] = result.recordset.map((record) =>
      toCamelCaseKeys<MemeType>(record)
    );

    const response: FetchMemesResponse = {
      page,
      limit,
      totalPages,
      totalCount,
      data: parsedRecords,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to get memes:", error);
    return new Response(JSON.stringify({ message: "Failed to get memes :(" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
