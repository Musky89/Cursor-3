import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topicId = parseInt(id, 10);
    const body = await request.json();
    const { content, author_name } = body;

    if (!content || !author_name) {
      return NextResponse.json(
        { error: "Content and author name are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    const topic = db
      .prepare(`SELECT id FROM forum_topics WHERE id = ?`)
      .get(topicId);

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    const result = db
      .prepare(
        `INSERT INTO forum_replies (topic_id, content, author_name) VALUES (?, ?, ?)`
      )
      .run(topicId, content, author_name);

    db.prepare(
      `UPDATE forum_topics SET reply_count = reply_count + 1, updated_at = datetime('now') WHERE id = ?`
    ).run(topicId);

    return NextResponse.json(
      { id: result.lastInsertRowid, success: true },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}
