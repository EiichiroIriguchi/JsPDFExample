import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { InvoiceComponent } from './invoice/invoice.component';
@NgModule({
  declarations: [AppComponent, InvoiceComponent],
  imports: [BrowserModule, FormsModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
