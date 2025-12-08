import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Pfad zur JSON-Datei finden
    const filePath = path.join(process.cwd(), 'data/tools.json');
    
    // 2. Datei einlesen
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const tools = JSON.parse(fileContent);

    console.log(`Lösche alte Tools...`);
    
    // SCHRITT A: Alles löschen, um Duplikate zu entfernen!
    await prisma.tool.deleteMany({}); 

    console.log(`Gefunden: ${tools.length} neue Tools. Starte Import...`);

    // SCHRITT B: Neu befüllen
    for (const tool of tools) {
      await prisma.tool.create({
        data: {
          name: tool.name,
          url: tool.url,
          category: tool.category,
          pricing: tool.pricing,
          affiliate_code: tool.affiliate_code,
          rating: tool.rating,
          summary: tool.summary,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Datenbank bereinigt. ${tools.length} Tools wurden frisch importiert.` 
    });

  } catch (error: any) {
    console.error("Fehler beim Seeding:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}