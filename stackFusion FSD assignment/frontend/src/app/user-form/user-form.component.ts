import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user = {
    name: '',
    dob: '',
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    this.http.post('/submit-form', this.user).subscribe(
      () => {
        alert('Form submitted successfully.');
        this.user = {
          name: '',
          dob: '',
          email: '',
          phone: ''
        };
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
