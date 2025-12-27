import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form initialization', () => {
    it('should initialize registerForm with empty values', () => {
      expect(component.registerForm.value).toEqual({
        email: '',
        password: '',
        confirmPassword: ''
      });
    });

    it('should have email field with required and email validators', () => {
      const emailControl = component.registerForm.get('email');
      expect(emailControl?.hasError('required')).toBeTruthy();

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('should have password field with required and minLength validators', () => {
      const passwordControl = component.registerForm.get('password');
      expect(passwordControl?.hasError('required')).toBeTruthy();

      passwordControl?.setValue('short');
      expect(passwordControl?.hasError('minlength')).toBeTruthy();

      passwordControl?.setValue('validpassword');
      expect(passwordControl?.valid).toBeTruthy();
    });

    it('should have confirmPassword field with required validator', () => {
      const confirmPasswordControl = component.registerForm.get('confirmPassword');
      expect(confirmPasswordControl?.hasError('required')).toBeTruthy();
    });
  });

  describe('passwordMatchValidator', () => {
    it('should set passwordMismatch error when passwords do not match', () => {
      component.registerForm.patchValue({
        password: 'password123',
        confirmPassword: 'different123'
      });

      expect(component.registerForm.hasError('passwordMismatch')).toBeTruthy();
      expect(component.registerForm.get('confirmPassword')?.hasError('passwordMismatch')).toBeTruthy();
    });

    it('should not set error when passwords match', () => {
      component.registerForm.patchValue({
        password: 'password123',
        confirmPassword: 'password123'
      });

      expect(component.registerForm.hasError('passwordMismatch')).toBeFalsy();
      expect(component.registerForm.get('confirmPassword')?.hasError('passwordMismatch')).toBeFalsy();
    });

    it('should return null when passwords match', () => {
      component.registerForm.patchValue({
        password: 'password123',
        confirmPassword: 'password123'
      });

      const result = component.passwordMatchValidator(component.registerForm);
      expect(result).toBeNull();
    });
  });

  describe('getErrorMessage', () => {
    it('should return empty string for untouched field', () => {
      const message = component.getErrorMessage('email');
      expect(message).toBe('');
    });

    it('should return email required message', () => {
      const emailControl = component.registerForm.get('email');
      emailControl?.markAsTouched();
      const message = component.getErrorMessage('email');
      expect(message).toBe("L'email est requis");
    });

    it('should return password required message', () => {
      const passwordControl = component.registerForm.get('password');
      passwordControl?.markAsTouched();
      const message = component.getErrorMessage('password');
      expect(message).toBe('Le mot de passe est requis');
    });

    it('should return confirmPassword required message', () => {
      const confirmPasswordControl = component.registerForm.get('confirmPassword');
      confirmPasswordControl?.markAsTouched();
      const message = component.getErrorMessage('confirmPassword');
      expect(message).toBe('La vérification du mot de passe est requise');
    });

    it('should return email format error message', () => {
      const emailControl = component.registerForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      const message = component.getErrorMessage('email');
      expect(message).toBe("Format d'email invalide");
    });

    it('should return minLength error message', () => {
      const passwordControl = component.registerForm.get('password');
      passwordControl?.setValue('short');
      passwordControl?.markAsTouched();
      const message = component.getErrorMessage('password');
      expect(message).toBe('Minimum 8 caractères');
    });

    it('should return password mismatch error message', () => {
      component.registerForm.patchValue({
        password: 'password123',
        confirmPassword: 'different123'
      });
      const confirmPasswordControl = component.registerForm.get('confirmPassword');
      confirmPasswordControl?.markAsTouched();
      const message = component.getErrorMessage('confirmPassword');
      expect(message).toBe('Les mots de passe ne correspondent pas');
    });
  });

  describe('onSubmit', () => {
    it('should not call authService.register if form is invalid', () => {
      component.registerForm.patchValue({
        email: '',
        password: '',
        confirmPassword: ''
      });

      component.onSubmit();

      expect(authService.register).not.toHaveBeenCalled();
    });

    it('should set isLoading to true when submitting', () => {
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      authService.register.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(component.isLoading).toBe(true);
    });

    it('should clear errorMessage when submitting', () => {
      component.errorMessage = 'Previous error';
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      authService.register.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(component.errorMessage).toBe('');
    });

    it('should call authService.register with form values', () => {
      const formData = {
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.registerForm.patchValue(formData);
      authService.register.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(authService.register).toHaveBeenCalledWith(formData);
    });

    it('should navigate to /upload on successful registration', (done) => {
      spyOn(router, 'navigate');
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      authService.register.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      setTimeout(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/upload']);
        done();
      }, 0);
    });

    it('should set isLoading to false on error', (done) => {
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      const error = { error: { message: 'Registration failed' } };
      authService.register.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set errorMessage on error', (done) => {
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      const error = { error: { message: 'Email already exists' } };
      authService.register.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Email already exists');
        done();
      }, 0);
    });

    it('should set default errorMessage when error has no message', (done) => {
      component.registerForm.patchValue({
        email: 'test@test.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      const error = { error: {} };
      authService.register.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Une erreur est survenue');
        done();
      }, 0);
    });
  });
});
