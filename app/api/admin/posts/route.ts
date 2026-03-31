import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";

export async function POST(request: NextRequest) {
  // Check auth
  const authHeader = request.headers.get("Authorization");
  const expectedToken = process.env.ADMIN_API_KEY;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Parse body
  let body: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    publishedAt?: string;
    author?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, slug, excerpt, content, category, readTime, publishedAt, author } = body;

  // Validate required fields
  if (!title || !slug || !excerpt || !content || !category || !readTime) {
    return NextResponse.json(
      { error: "Missing required fields: title, slug, excerpt, content, category, readTime" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString().split("T")[0];

  try {
    const [inserted] = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        excerpt,
        content,
        category,
        readTime,
        publishedAt: publishedAt || now,
        author: author || "Your Rhythm Team",
      })
      .returning();

    return NextResponse.json(
      { success: true, post: inserted },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }
    console.error("Error inserting post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
