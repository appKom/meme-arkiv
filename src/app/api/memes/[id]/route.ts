import { FetchMemeResponse } from "@/lib/fetchMemes";
import { CommentType, MemeType } from "@/lib/types";
import { toCamelCaseKeys } from "@/lib/utils";
import { NextResponse } from "next/server";
import sql from "mssql";
import { poolPromise } from "@/lib/azureClient";

export async function GET(request: Request): Promise<Response> {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (apiKey !== process.env.API_KEY) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);

    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "No article provided" },
        { status: 400 }
      );
    }
    const pageParam = url.searchParams.get("page");
    const limitParam = url.searchParams.get("limit");

    const page = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "10", 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: "Invalid 'page' parameter. It must be a positive integer." },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          message:
            "Invalid 'limit' parameter. It must be a positive integer between 1 and 100.",
        },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const pool = await poolPromise;

    const postResult = await pool.request().input("Id", sql.NVarChar, id)
      .query(`
      SELECT 
        Id, 
        Name, 
        Author, 
        Username, 
        AuthorImage, 
        Date, 
        Url, 
        Type, 
        Text, 
        Reactions, 
        ChannelName
      FROM MediaFiles
      WHERE Id = @Id
    `);

    if (postResult.recordset.length === 0) {
      return NextResponse.json(
        { message: `Post with id ${id} not found.` },
        { status: 404 }
      );
    }

    const post = postResult.recordset[0];

    const countResult = await pool.request().input("PostId", sql.NVarChar, id)
      .query(`
        SELECT COUNT(*) AS Total
        FROM Comments
        WHERE PostId = @PostId
      `);

    const totalComments = countResult.recordset[0].Total;
    const totalPages = Math.ceil(totalComments / limit);

    const commentsResult = await pool
      .request()
      .input("PostId", sql.NVarChar, id)
      .input("Limit", sql.Int, limit)
      .input("Offset", sql.Int, offset).query(`
        SELECT 
          CommentId, 
          PostId, 
          Name, 
          Author, 
          Username, 
          AuthorImage, 
          Date, 
          Url, 
          Type, 
          Text, 
          Reactions, 
          ChannelName, 
          FileUrl, 
          UpdatedAt
        FROM Comments
        WHERE PostId = @PostId
        ORDER BY Date DESC
        OFFSET @Offset ROWS
        FETCH NEXT @Limit ROWS ONLY
      `);

    const comments = commentsResult.recordset;

    const response: FetchMemeResponse = {
      page,
      limit,
      totalPages,
      totalCount: totalComments,
      data: {
        meme: toCamelCaseKeys<MemeType>(post),
        comments: comments.map((comment: CommentType) =>
          toCamelCaseKeys<CommentType>(comment)
        ),
      },
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
