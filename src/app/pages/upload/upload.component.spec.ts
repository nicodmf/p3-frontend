import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { UploadComponent } from './upload.component';
import { UploadService } from '../../services/upload.service';
import { provideRouter } from '@angular/router';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let uploadService: jasmine.SpyObj<UploadService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const uploadServiceSpy = jasmine.createSpyObj('UploadService', ['uploadFile']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UploadComponent, ReactiveFormsModule],
      providers: [
        { provide: UploadService, useValue: uploadServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    uploadService = TestBed.inject(UploadService) as jasmine.SpyObj<UploadService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form initialization', () => {
    it('should initialize uploadForm with default values', () => {
      expect(component.uploadForm.value).toEqual({
        password: '',
        expirationDays: '1'
      });
    });

    it('should have expirationDays field with required validator', () => {
      const expirationDaysControl = component.uploadForm.get('expirationDays');
      expirationDaysControl?.setValue('');
      expect(expirationDaysControl?.hasError('required')).toBeTruthy();

      expirationDaysControl?.setValue('1');
      expect(expirationDaysControl?.valid).toBeTruthy();
    });

    it('should have password field without validators', () => {
      const passwordControl = component.uploadForm.get('password');
      expect(passwordControl?.valid).toBeTruthy();
    });
  });

  describe('expirationOptions', () => {
    it('should have 4 expiration options', () => {
      expect(component.expirationOptions.length).toBe(4);
    });

    it('should have correct expiration option values', () => {
      const values = component.expirationOptions.map(opt => opt.value);
      expect(values).toEqual(['1', '2', '3', '7']);
    });

    it('should have correct expiration option labels', () => {
      const labels = component.expirationOptions.map(opt => opt.label);
      expect(labels).toEqual(['Une journée', 'Deux jours', 'Trois jours', 'Une semaine']);
    });
  });

  describe('selectedFileName', () => {
    it('should return empty string when no file is selected', () => {
      component.selectedFile = null;
      expect(component.selectedFileName).toBe('');
    });

    it('should return file name when file is selected', () => {
      const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      component.selectedFile = mockFile;
      expect(component.selectedFileName).toBe('test.pdf');
    });
  });

  describe('selectedFileSize', () => {
    it('should return empty string when no file is selected', () => {
      component.selectedFile = null;
      expect(component.selectedFileSize).toBe('');
    });

    it('should return size in Ko for files less than 1 MB', () => {
      const mockFile = new File(['a'.repeat(512 * 1024)], 'test.txt');
      component.selectedFile = mockFile;
      const size = component.selectedFileSize;
      expect(size).toContain('Ko');
    });

    it('should return size in Mo for files 1 MB or larger', () => {
      const mockFile = new File(['a'.repeat(2 * 1024 * 1024)], 'test.pdf');
      component.selectedFile = mockFile;
      const size = component.selectedFileSize;
      expect(size).toContain('Mo');
    });
  });

  describe('triggerFileInput', () => {
    it('should call click on file input element if it exists', () => {
      const fileInput = document.createElement('input');
      fileInput.id = 'file';
      fileInput.type = 'file';
      const clickSpy = jasmine.createSpy('click');
      fileInput.click = clickSpy;

      spyOn(document, 'getElementById').and.returnValue(fileInput);

      component.triggerFileInput();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should handle missing file input gracefully', () => {
      spyOn(document, 'getElementById').and.returnValue(null);

      expect(() => component.triggerFileInput()).not.toThrow();
    });
  });

  describe('getErrorMessage', () => {
    it('should return empty string for untouched field', () => {
      const message = component.getErrorMessage('expirationDays');
      expect(message).toBe('');
    });

    it('should return expiration required message', () => {
      const expirationDaysControl = component.uploadForm.get('expirationDays');
      expirationDaysControl?.setValue('');
      expirationDaysControl?.markAsTouched();
      const message = component.getErrorMessage('expirationDays');
      expect(message).toBe("L'expiration est requise");
    });
  });

  describe('onFileSelected', () => {
    it('should set selectedFile when file is selected', () => {
      const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const event = {
        target: {
          files: [mockFile]
        }
      } as any;

      component.onFileSelected(event);

      expect(component.selectedFile).toBe(mockFile);
    });

    it('should not set selectedFile when no files', () => {
      const event = {
        target: {
          files: []
        }
      } as any;

      component.selectedFile = null;
      component.onFileSelected(event);

      expect(component.selectedFile).toBeNull();
    });
  });

  describe('onSubmit', () => {
    it('should not call uploadService.uploadFile if form is invalid', () => {
      component.uploadForm.patchValue({
        expirationDays: ''
      });

      component.onSubmit();

      expect(uploadService.uploadFile).not.toHaveBeenCalled();
    });

    it('should not call uploadService.uploadFile if no file is selected', () => {
      component.selectedFile = null;

      component.onSubmit();

      expect(uploadService.uploadFile).not.toHaveBeenCalled();
    });

    it('should set isLoading to true initially when submitting', () => {
      component.selectedFile = new File(['content'], 'test.pdf');
      component.uploadForm.patchValue({ expirationDays: '1' });

      // Create a delayed observable to capture the loading state
      let resolveObservable: any;
      const delayedObservable = new Observable(subscriber => {
        resolveObservable = () => {
          subscriber.next({
            id: '123',
            title: 'test',
            description: '',
            fileName: 'test.pdf',
            fileSize: 1024,
            downloadUrl: 'http://example.com',
            createdAt: '2025-12-23'
          });
          subscriber.complete();
        };
      });

      uploadService.uploadFile.and.returnValue(delayedObservable as any);

      component.onSubmit();

      // isLoading should be true before the observable completes
      expect(component.isLoading).toBe(true);

      // Complete the observable
      resolveObservable();
    });

    it('should clear error messages when submitting', () => {
      component.selectedFile = new File(['content'], 'test.pdf');
      component.uploadForm.patchValue({ expirationDays: '1' });
      component.errorMessage = 'Previous error';

      // Create a delayed observable
      let resolveObservable: any;
      const delayedObservable = new Observable(subscriber => {
        resolveObservable = () => {
          subscriber.next({
            id: '123',
            title: 'test',
            description: '',
            fileName: 'test.pdf',
            fileSize: 1024,
            downloadUrl: 'http://example.com',
            createdAt: '2025-12-23'
          });
          subscriber.complete();
        };
      });

      uploadService.uploadFile.and.returnValue(delayedObservable as any);

      component.onSubmit();

      // Error message should be cleared immediately
      expect(component.errorMessage).toBe('');

      // Complete the observable
      resolveObservable();
    });

    it('should create FormData with file and expirationDays', () => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({ expirationDays: '3' });
      uploadService.uploadFile.and.returnValue(of({
        id: '123',
        title: 'test',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.onSubmit();

      expect(uploadService.uploadFile).toHaveBeenCalled();
      const formData = uploadService.uploadFile.calls.mostRecent().args[0] as FormData;
      expect(formData.get('file')).toBe(mockFile);
      expect(formData.get('expirationDays')).toBe('3');
    });

    it('should include password in FormData when provided', () => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({
        expirationDays: '1',
        password: 'secret123'
      });
      uploadService.uploadFile.and.returnValue(of({
        id: '123',
        title: 'test',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.onSubmit();

      const formData = uploadService.uploadFile.calls.mostRecent().args[0] as FormData;
      expect(formData.get('password')).toBe('secret123');
    });

    it('should not include password in FormData when empty', () => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({
        expirationDays: '1',
        password: ''
      });
      uploadService.uploadFile.and.returnValue(of({
        id: '123',
        title: 'test',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.onSubmit();

      const formData = uploadService.uploadFile.calls.mostRecent().args[0] as FormData;
      expect(formData.get('password')).toBeNull();
    });

    it('should set success message and reset form on successful upload', (done) => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({ expirationDays: '1' });
      uploadService.uploadFile.and.returnValue(of({
        id: '123',
        title: 'test',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.onSubmit();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        expect(component.successMessage).toBe('Fichier téléversé avec succès !');
        expect(component.selectedFile).toBeNull();
        done();
      }, 0);
    });

    it('should set isLoading to false on error', (done) => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({ expirationDays: '1' });
      const error = { error: { message: 'Upload failed' } };
      uploadService.uploadFile.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set errorMessage on error', (done) => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({ expirationDays: '1' });
      const error = { error: { message: 'File too large' } };
      uploadService.uploadFile.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe('File too large');
        done();
      }, 0);
    });

    it('should set default errorMessage when error has no message', (done) => {
      const mockFile = new File(['content'], 'test.pdf');
      component.selectedFile = mockFile;
      component.uploadForm.patchValue({ expirationDays: '1' });
      const error = { error: {} };
      uploadService.uploadFile.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe("Une erreur est survenue lors de l'upload");
        done();
      }, 0);
    });
  });
});
