// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });

    // check exists
    const { data: existing } = await supabaseServer
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (existing?.length) return NextResponse.json({ error: "User exists" }, { status: 400 });

    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabaseServer.from("users").insert({
      email,
      name,
      password_hash,
      role: "user"
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
