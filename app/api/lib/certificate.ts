import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PURPLE_DARK: [number, number, number] = [0.1, 0, 0.25];
const PURPLE_MID: [number, number, number] = [0.176, 0.039, 0.361];
const GOLD: [number, number, number] = [1, 0.722, 0];
const GOLD_DIM: [number, number, number] = [1, 0.722, 0];
const LAVENDER: [number, number, number] = [0.784, 0.647, 1];
const WHITE_DIM: [number, number, number] = [1, 1, 1];
const WHITE_MUTED: [number, number, number] = [1, 1, 1];
const GOLD_FADED: [number, number, number] = [1, 0.722, 0];

export const SPECIAL_FOUNDERS: Record<number, { title: string; icon: string }> = {
  1:   { title: 'Rey Fundador', icon: '­ƒææ' },
  25:  { title: 'Vanguardia', icon: '­ƒöÑ' },
  50:  { title: 'Campe├│n', icon: '­ƒÅå' },
  100: { title: 'Leyenda', icon: 'Ô£¿' },
  150: { title: 'Guardi├ín', icon: '­ƒøí´©Å' },
  200: { title: 'Forjador', icon: 'ÔÜÆ´©Å' },
  250: { title: 'Gran Maestro', icon: '­ƒö«' },
  300: { title: 'Comandante', icon: 'ÔÜö´©Å' },
  333: { title: 'Chispa Sagrada', icon: '­ƒîƒ' },
  360: { title: 'Fundador Global', icon: '­ƒîì' },
  400: { title: 'Se├▒or del F├®nix', icon: '­ƒªà' },
  450: { title: 'H├®roe de la Llama Eterna', icon: 'Ô¡É' },
  500: { title: 'Chisp├¡n Supremo', icon: '­ƒææ­ƒöÑ' },
};

function isSpecial(id: number): boolean {
  return id in SPECIAL_FOUNDERS;
}

function specialInfo(id: number): { title: string; icon: string } | null {
  return SPECIAL_FOUNDERS[id] ?? null;
}

export async function generateCertificatePDF(
  name: string,
  founderId: number,
  date: Date,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([620, 880]);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const special = specialInfo(founderId);
  const isSpecialNumber = special !== null;
  const isLegendary = founderId === 1;

  // Purple gradient background (simulated with rectangles)
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = PURPLE_DARK[0] + (PURPLE_MID[0] - PURPLE_DARK[0]) * Math.min(t * 2, 1);
    const g = PURPLE_DARK[1] + (PURPLE_MID[1] - PURPLE_DARK[1]) * Math.min(t * 2, 1);
    const b = PURPLE_DARK[2] + (PURPLE_MID[2] - PURPLE_DARK[2]) * Math.min(t * 2, 1);
    const y = (i / steps) * height;
    page.drawRectangle({
      x: 0, y, width, height: height / steps + 1,
      color: rgb(r, g, b),
    });
  }

  if (isSpecialNumber) {
    // Glow circles behind the text
    for (let i = 0; i < 3; i++) {
      const cx = 180 + i * 130;
      const cy = 420;
      page.drawCircle({
        x: cx, y: cy, size: 140,
        color: rgb(1, 0.85, 0),
        opacity: 0.04,
      });
    }
  }

  // Outer gold border
  page.drawRectangle({
    x: 20, y: 20, width: 580, height: 840,
    borderColor: rgb(...GOLD),
    borderWidth: isSpecialNumber ? (isLegendary ? 10 : 8) : 6,
  });

  // Special double-border
  if (isSpecialNumber) {
    page.drawRectangle({
      x: 30, y: 30, width: 560, height: 820,
      borderColor: rgb(...GOLD),
      borderWidth: 1.5,
    });
  }

  // Inner dim border
  page.drawRectangle({
    x: 35, y: 35, width: 550, height: 810,
    borderColor: rgb(1, 0.722, 0),
    borderWidth: 2,
    opacity: 0.3,
  });

  // Title
  page.drawText('CHISP├ìN', {
    x: 310, y: 750, size: 52,
    font: helveticaBold, color: rgb(...GOLD),
  });

  // Subtitle
  const subtitle = isSpecialNumber
    ? `${special!.icon} ${special!.title} ${special!.icon}`
    : 'Edici├│n Fundadores';
  page.drawText(subtitle, {
    x: 310, y: 715, size: isSpecialNumber ? 20 : 18,
    font: helveticaBold,     color: rgb(...GOLD_DIM),
    opacity: 0.7,
  });

  // Certificate text
  const certLabel = isLegendary
    ? 'CERTIFICADO LEGENDARIO'
    : isSpecialNumber
      ? `Certificado ${special!.title}`
      : 'Certificado de Fundador';
  page.drawText(certLabel, {
    x: 310, y: 600, size: isSpecialNumber ? 24 : 22,
    font: helveticaBold, color: rgb(...LAVENDER),
  });

  if (isSpecialNumber) {
    page.drawText('Ô¡É Edici├│n Fundadores Ô¡É', {
      x: 310, y: 575, size: 13,
      font: helvetica,     color: rgb(...GOLD_DIM),
    opacity: 0.7,
    });
  }

  page.drawText('Por la presente se otorga este certificado a', {
    x: 310, y: isSpecialNumber ? 540 : 555, size: 14,
    font: helvetica,     color: rgb(...WHITE_DIM),
    opacity: 0.6,
  });

  // Name
  page.drawText(name, {
    x: 310, y: isSpecialNumber ? 505 : 520, size: 20,
    font: helveticaBold, color: rgb(...GOLD),
  });

  // Founder number
  page.drawText(`#${String(founderId).padStart(6, '0')}`, {
    x: 310, y: isSpecialNumber ? 410 : 430, size: isSpecialNumber ? 78 : 72,
    font: helveticaBold, color: rgb(...GOLD),
  });

  // Rarity label
  if (isSpecialNumber && special) {
    page.drawText(`${special.icon} ${special.title} ÔÇö Fundador n┬║ ${founderId}`, {
      x: 310, y: 360, size: 13,
      font: helveticaBold, color: rgb(...GOLD),
    });
  }

  // Date
  const dateStr = date.toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  page.drawText(dateStr, {
    x: 310, y: isSpecialNumber ? 315 : 340, size: 14,
    font: helvetica,     color: rgb(...WHITE_MUTED),
    opacity: 0.4,
  });

  // Footer
  page.drawText('chispin.es ┬À La Chispa Nunca Se Apaga', {
    x: 310, y: 60, size: 12,
    font: helvetica,     color: rgb(...GOLD_FADED),
    opacity: 0.3,
  });

  return pdfDoc.save();
}
