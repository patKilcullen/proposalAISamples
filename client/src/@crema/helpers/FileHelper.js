import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const downloadPdf = (
  noDownload = false,
  elementName = 'pdfdiv',
  fileName = 'Invoice.pdf',
) => {
  const input = document.getElementById(elementName);
  const result = html2canvas(input, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    const doc = new JsPDF('p', 'mm', 'a4');
    const imgWidth = 200;
    const pageHeight = 290;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 5;

    const img = canvas.toDataURL('image/jpeg');

    doc.addImage(img, 'JPEG', 3, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(img, 'JPEG', 3, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    if (!noDownload) doc.save(fileName);
    return doc.output('blob');
  });

  return result;
};
