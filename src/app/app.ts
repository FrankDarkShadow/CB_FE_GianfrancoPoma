import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Account } from './services/account';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  //protected readonly title = signal('productos-front');
  account: any = null;
  amount: number = 0;
  type: string = 'DEPOSIT';
  message: string = '';
  isError: boolean = false;

  constructor(private accountService: Account) {}

  ngOnInit() {
    this.refreshAccount();
  }

  refreshAccount() {
    this.accountService.getAccount(1).subscribe({
      next: (data) => this.account = data,
      error: () => { 
        this.message = 'Error loading account from server'; 
        this.isError = true; 
      }
    });
  }

  sendTransaction() {
    if (this.amount <= 0) {
      this.message = 'Amount must be greater than 0';
      this.isError = true;
      return;
    }

    const payload = {
      type: this.type,
      amount: this.amount,
      accountId: 1
    };

    this.accountService.postTransaction(payload).subscribe({
      next: () => {
        this.message = 'Transaction processed successfully!';
        this.isError = false;
        this.amount = 0;
        this.refreshAccount(); 
      },
      error: (err) => {
        this.message = err.error || 'Transaction failed';
        this.isError = true;
      }
    });
  }
}
