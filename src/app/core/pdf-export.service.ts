import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService<T = any> {
  private readonly platformId = inject(PLATFORM_ID);

  async exportToPdf(
    data: T | T[],
    filename: string,
    formatCallback: (doc: jsPDF, item: T, index?: number) => void
  ): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('PDF export is not supported in non-browser environments');
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const items = Array.isArray(data) ? data : [data];

      items.forEach((item, index) => {
        formatCallback(doc, item, index);
        if (index < items.length - 1) {
          doc.addPage();
        }
      });

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      throw new Error('PDF export failed');
    }
  }
}
