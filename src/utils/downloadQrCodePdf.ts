import { jsPDF } from 'jspdf';
import { buildQrCodeUrl } from './buildQrCodeUrl';

const PDF_QR_SIZE_PX = 400;
const PDF_QR_SIZE_MM = 90;

async function fetchQrCodeImageData(url: string): Promise<string> {
  const response = await fetch(
    buildQrCodeUrl(url, { size: PDF_QR_SIZE_PX, format: 'base64' }),
  );

  if (!response.ok) {
    throw new Error('Unable to fetch QR code image.');
  }

  const base64 = (await response.text()).trim();

  if (!base64) {
    throw new Error('QR code image is empty.');
  }

  return `data:image/png;base64,${base64}`;
}

export async function downloadQrCodePdf(url: string): Promise<void> {
  const imageData = await fetchQrCodeImageData(url);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const qrX = (pageWidth - PDF_QR_SIZE_MM) / 2;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Shortly — QR Code', pageWidth / 2, 28, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('Scan to open this link', pageWidth / 2, 36, { align: 'center' });

  pdf.setFontSize(11);

  pdf.addImage(imageData, 'PNG', qrX, 48, PDF_QR_SIZE_MM, PDF_QR_SIZE_MM);

  const wrappedUrl = pdf.splitTextToSize(url, pageWidth - 40);
  pdf.text(wrappedUrl, pageWidth / 2, 48 + PDF_QR_SIZE_MM + 15, { align: 'center' });

  pdf.save('shortly-qr-code.pdf');
}
