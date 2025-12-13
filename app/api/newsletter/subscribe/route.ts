import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // 1. Prüfen ob schon existiert
    const existing = await db.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      // Wir tun so als ob es geklappt hat (Privacy: Nicht verraten, wer schon drin ist)
      return NextResponse.json({ success: true, message: "Welcome back!" });
    }

    // 2. Speichern
    await db.subscriber.create({
      data: { email },
    });

    return NextResponse.json({ success: true, message: "You are on the list." });

  } catch (error: any) {
    console.error("Newsletter Error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}