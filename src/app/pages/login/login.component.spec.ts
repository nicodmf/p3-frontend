import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form initialization', () => {
    it('should initialize loginForm with empty values', () => {
      expect(component.loginForm.value).toEqual({
        email: '',
        password: ''
      });
    });

    it('should have email field with required and email validators', () => {
      const emailControl = component.loginForm.get('email');
      expect(emailControl?.hasError('required')).toBeTruthy();

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('should have password field with required validator', () => {
      const passwordControl = component.loginForm.get('password');
      expect(passwordControl?.hasError('required')).toBeTruthy();

      passwordControl?.setValue('anypassword');
      expect(passwordControl?.valid).toBeTruthy();
    });
  });

  describe('getErrorMessage', () => {
    it('should return empty string for untouched field', () => {
      const message = component.getErrorMessage('email');
      expect(message).toBe('');
    });

    it('should return empty string for valid field', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('test@test.com');
      emailControl?.markAsTouched();
      const message = component.getErrorMessage('email');
      expect(message).toBe('');
    });

    it('should return email required message', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.markAsTouched();
      const message = component.getErrorMessage('email');
      expect(message).toBe("L'email est requis");
    });

    it('should return password required message', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.markAsTouched();
      const message = component.getErrorMessage('password');
      expect(message).toBe('Le mot de passe est requis');
    });

    it('should return email format error message', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      const message = component.getErrorMessage('email');
      expect(message).toBe("Format d'email invalide");
    });
  });

  describe('onSubmit', () => {
    it('should not call authService.login if form is invalid', () => {
      component.loginForm.patchValue({
        email: '',
        password: ''
      });

      component.onSubmit();

      expect(authService.login).not.toHaveBeenCalled();
    });

    it('should set isLoading to true when submitting', () => {
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      authService.login.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(component.isLoading).toBe(true);
    });

    it('should clear errorMessage when submitting', () => {
      component.errorMessage = 'Previous error';
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      authService.login.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(component.errorMessage).toBe('');
    });

    it('should call authService.login with form values', () => {
      const formData = {
        email: 'test@test.com',
        password: 'password123'
      };
      component.loginForm.patchValue(formData);
      authService.login.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith(formData);
    });

    it('should navigate to /upload on successful login', (done) => {
      spyOn(router, 'navigate');
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      authService.login.and.returnValue(of({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } }));

      component.onSubmit();

      setTimeout(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/upload']);
        done();
      }, 0);
    });

    it('should set isLoading to false on error', (done) => {
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      const error = { error: { message: 'Login failed' } };
      authService.login.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set errorMessage on error', (done) => {
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      const error = { error: { message: 'Invalid credentials' } };
      authService.login.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Invalid credentials');
        done();
      }, 0);
    });

    it('should set default errorMessage when error has no message', (done) => {
      component.loginForm.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      const error = { error: {} };
      authService.login.and.returnValue(throwError(() => error));

      component.onSubmit();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Une erreur est survenue');
        done();
      }, 0);
    });
  });

  describe('Template integration', () => {
    it('should have isLoading property', () => {
      expect(component.isLoading).toBeDefined();
      expect(component.isLoading).toBe(false);
    });

    it('should have errorMessage property', () => {
      expect(component.errorMessage).toBeDefined();
      expect(component.errorMessage).toBe('');
    });
  });
});
