import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceItem {
  description: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoiceItems = [
    { description: 'Item 1', quantity: 1, unitPrice: 100, amount: 100 },
    { description: 'Item 2', quantity: 2, unitPrice: 150, amount: 300 },
    { description: 'Item 3', quantity: 3, unitPrice: 200, amount: 600 },
    { description: 'Item 4', quantity: 1, unitPrice: 250, amount: 250 },
    { description: 'Item 5', quantity: 5, unitPrice: 300, amount: 1500 },
    { description: 'Item 6', quantity: 2, unitPrice: 350, amount: 700 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },
    { description: 'Item 7', quantity: 1, unitPrice: 400, amount: 400 },

    // Add more items as needed
  ];
  displayItems: InvoiceItem[] = [];

  constructor() {}

  async saveAsPdf() {
    const invoiceElement = document.getElementById('invoice');
    const itemsPerPage = 6;
    const totalPages = Math.ceil(this.invoiceItems.length / itemsPerPage);

    const pdf = new jsPDF({ format: 'a4', unit: 'mm' }); // Update this line
    for (let page = 0; page < totalPages; page++) {
      this.updateDisplayItems(page, itemsPerPage);
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));

      const canvas = await html2canvas(invoiceElement!, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (page > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save('invoice.pdf');
    this.updateDisplayItems(0, itemsPerPage);
  }
  private updateDisplayItems(page: number, itemsPerPage: number): void {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.displayItems = this.invoiceItems.slice(startIndex, endIndex);
  }
  getTotal(): number {
    return this.invoiceItems.reduce((total, item) => total + item.amount, 0);
  }
}
