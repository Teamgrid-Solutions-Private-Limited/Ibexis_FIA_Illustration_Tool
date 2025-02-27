import React, { useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import ApiCall from './services/ApiCall';
import { useSelector } from 'react-redux';
 
const PdfMerger = () => {
  const { pdfList } = useSelector(state => state.mergePdf);
 
  useEffect(() => { 
    if (pdfList.length > 0) {
      mergePdfs(pdfList);
    }
  }, [pdfList]);
 
  const mergePdfs = async (pdfList_local) => {
    try {
      // Fetch PDFs from URLs
      const pdfBytesArray = await Promise.all(
        pdfList_local.map(async ({ PDFUrl }) => {
          const response = await fetch(PDFUrl);
          if (!response.ok) throw new Error(`Failed to fetch ${PDFUrl}`);
          return await response.arrayBuffer();
        })
      );
 
      // Load PDF documents
      const pdfDocs = await Promise.all(pdfBytesArray.map((bytes, index) => {
        return PDFDocument.load(bytes);
      }));
 
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
 
      // Copy pages from each PDF based on PageCount
      for (let i = 0; i < pdfList_local.length; i++) {
        const { PageCount } = pdfList_local[i];
        const pdfDoc = pdfDocs[i];
        const totalPages = pdfDoc.getPageCount();
        const pagesToCopy = Array.from({ length: Math.min(PageCount, totalPages) }, (_, i) => i);
 
        const pages = await mergedPdf.copyPages(pdfDoc, pagesToCopy);
        pages.forEach(page => mergedPdf.addPage(page));
      }
 
      // Serialize the merged PDF document to bytes
      const mergedPdfBytes = await mergedPdf.save();
      // Create a Blob from the bytes and create a URL for the Blob
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      // Open the PDF in the same tab
      window.location.href = url;
    } catch (error) {
      console.error('Failed to merge PDFs:', error);
    }
  };
 
  return (
<div>
<ApiCall mergePdfs={mergePdfs} />
</div>
  );
};
 
export default PdfMerger;