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

    console.log(`Gefunden: ${tools.length} Tools. Starte Import...`);

    // 3. Datenbank befüllen
    // Wir nutzen "upsert", damit keine Duplikate entstehen (basierend auf der URL)
    for (const tool of tools) {
      await prisma.tool.upsert({
        where: { url: tool.url },
        update: {
          name: tool.name,
          category: tool.category,
          pricing: tool.pricing,
          affiliate_code: tool.affiliate_code,
          rating: tool.rating,
          summary: tool.summary,
        },
        create: {
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
      message: `${tools.length} Tools wurden erfolgreich importiert/aktualisiert.` 
    });

  } catch (error: any) {
    console.error("Fehler beim Seeding:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}