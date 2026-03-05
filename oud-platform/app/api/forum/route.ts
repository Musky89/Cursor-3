import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author_name, category, fragrance_id } = body;

    if (!title || !content || !author_name) {
      return NextResponse.json(
        { error: "Title, content, and author name are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = db
      .prepare(
        `INSERT INTO forum_topics (title, content, author_name, category, fragrance_id)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(title, content, author_name, category || "general", fragrance_id || null);

    return NextResponse.json(
      { id: result.lastInsertRowid, success: true },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}
