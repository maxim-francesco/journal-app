import { Injectable, inject } from '@angular/core';
import { PdfExportService } from '../../../core/pdf-export.service';
import { Journal } from './jurnal.model';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class JournalPdfExportService {
  private readonly pdfExportService = inject(PdfExportService<Journal>);

  async exportJournal(journal: Journal, filename?: string): Promise<void> {
    const defaultFilename = journal.id ? `journal_${journal.id}` : 'journal';
    await this.pdfExportService.exportToPdf(
      journal,
      filename || defaultFilename,
      this.formatJournal
    );
  }

  async exportJournals(journals: Journal[], filename?: string): Promise<void> {
    await this.pdfExportService.exportToPdf(
      journals,
      filename || 'journals',
      this.formatJournal
    );
  }

  private formatJournal(doc: jsPDF, journal: Journal, index?: number): void {
    let yPos = 20;

    if (index !== undefined) {
      doc.setFontSize(14);
      doc.text(`Journal ${index + 1}`, 20, yPos);
      yPos += 10;
    }

    doc.setFontSize(16);
    doc.text(journal.title || 'Untitled', 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(`Category: ${journal.category || 'N/A'}`, 20, yPos);
    yPos += 10;

    doc.text(`Date: ${journal.date || 'N/A'}`, 20, yPos);
    yPos += 10;

    if (journal.content) {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(journal.content, 170);
      doc.text(lines, 20, yPos);
    }
  }
}
