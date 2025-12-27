import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { CalloutComponent } from '../../components/callout/callout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent, SelectOption } from '../../components/select/select.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CalloutComponent, ButtonComponent, InputComponent, SelectComponent, IconComponent],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  expirationOptions: SelectOption[] = [
    { value: '1', label: 'Une journée' },
    { value: '2', label: 'Deux jours' },
    { value: '3', label: 'Trois jours' },
    { value: '7', label: 'Une semaine' }
  ];

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      password: [''],
      expirationDays: ['1', [Validators.required]]
    });
  }

  get selectedFileName(): string {
    return this.selectedFile ? this.selectedFile.name : '';
  }

  get selectedFileSize(): string {
    if (!this.selectedFile) return '';
    const sizeInMB = this.selectedFile.size / (1024 * 1024);
    return sizeInMB < 1
      ? `${(this.selectedFile.size / 1024).toFixed(1)} Ko`
      : `${sizeInMB.toFixed(1)} Mo`;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput?.click();
  }

  getErrorMessage(field: string): string {
    const control = this.uploadForm.get(field);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      if (field === 'expirationDays') return "L'expiration est requise";
    }

    return '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('expirationDays', this.uploadForm.get('expirationDays')?.value.toString());

    const password = this.uploadForm.get('password')?.value;
    if (password) {
      formData.append('password', password);
    }

    this.uploadService.uploadFile(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Fichier téléversé avec succès !';
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Une erreur est survenue lors de l\'upload';
      }
    });
  }
}
