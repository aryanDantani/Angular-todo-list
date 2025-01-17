import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PhoneNumberPipe } from '../../phone-number.pipe';

@Component({
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
  imports: [FormsModule, CommonModule, PhoneNumberPipe],
  providers: [PhoneNumberPipe],
})
export class TodoAddEditComponent implements OnInit {
  title: string = '';
  description: string = '';
  date: string = '';
  startTime: string = '';
  startMeridian: 'AM' | 'PM' = 'AM';
  endTime: string = '';
  endMeridian: 'AM' | 'PM' = 'AM';
  imageUrl: string = '';
  category: 'technical' | 'non-technical' | 'UI-UX' = 'technical';
  isEdit: boolean = false;
  id!: number;
  phonePattern: string = '^[6-9][0-9]{9}$';
  isImagePreviewVisible: boolean = false;
  phone: string = '';
  countryCode: string = '+91'; // Default to India

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private phoneNumberPipe: PhoneNumberPipe
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.isEdit = true;
      this.id = Number(idParam);

      const todo = this.todoService.getTodoById(this.id);
      if (todo) {
        this.title = todo.title;
        this.description = todo.description;
        this.date = todo.date || '';
        this.startTime = todo.startTime || '';
        this.startMeridian = todo.startMeridian || 'AM';
        this.endTime = todo.endTime || '';
        this.endMeridian = todo.endMeridian || 'AM';
        this.imageUrl = todo.imageUrl || '';
        this.category = todo.category;

        // Clean and assign phone number
        if (todo.phone) {
          this.phone = todo.phone.replace(/[^0-9]/g, '').trim(); // Remove special characters and trim
        }

        this.countryCode = todo.countryCode || '+91'; // Default country code if not available
      } else {
        console.warn(`Todo with id ${this.id} not found.`);
      }
    }
  }


  openImagePreview(image: string): void {
    this.imageUrl = image;
    this.isImagePreviewVisible = true;
  }

  // Method to close image preview dialog
  closeImagePreview(): void {
    this.isImagePreviewVisible = false;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result as string;
        console.log(this.imageUrl, 'this.imageUrl');
      };
      reader.readAsDataURL(file);
    }
  }

  validatePhoneNumber(): void {
    switch (this.countryCode) {
      case '+91': // India
        this.phonePattern = '^[6-9][0-9]{9}$'; // Starts with 6-9, exactly 10 digits
        break;
      case '+1': // USA
        this.phonePattern = '^[2-9][0-9]{9}$'; // Starts with 2-9, exactly 10 digits
        break;
      case '+44': // UK
        this.phonePattern = '^[1-9][0-9]{9}$'; // Starts with 1-9, exactly 10 digits
        break;
      default:
        this.phonePattern = '^[0-9]+$'; // Default to digits only
    }
  }

  onCountryCodeChange(): void {
    this.validatePhoneNumber();
  }

  onSubmit(): void {
    if (
      !this.title.trim() ||
      !this.description.trim() ||
      !this.category ||
      !this.date ||
      !this.startTime ||
      !this.startMeridian ||
      !this.endTime ||
      !this.endMeridian ||
      !this.phone ||
      !this.countryCode
    ) {
      alert('All fields are required.');
      return;
    }

    const formattedPhone = this.phoneNumberPipe.transform(
      this.phone.trim(),
      this.countryCode
    ); // Format phone number

    const todoData = {
      title: this.title.trim(),
      description: this.description.trim(),
      date: this.date,
      startTime: this.startTime,
      startMeridian: this.startMeridian,
      endTime: this.endTime,
      endMeridian: this.endMeridian,
      imageUrl: this.imageUrl.trim(),
      category: this.category,
      countryCode: this.countryCode,
      phone: `${formattedPhone}`,
    };
0
    if (this.isEdit) {
      try {
        this.todoService.updateTodo(this.id, todoData);
      } catch (error) {
        console.error('Error updating todo:', error);
        return;
      }
    } else {
      try {
        this.todoService.addTodo(todoData);
      } catch (error) {
        console.error('Error adding todo:', error);
        return;
      }
    }

    this.router
      .navigate(['/'])
      .catch((error) => console.error('Error navigating to home:', error));
  }
}
