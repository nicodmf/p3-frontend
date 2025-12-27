import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should send POST request to /api/auth/register', () => {
      const request = { email: 'test@test.com', password: 'password123' };

      service.register(request).subscribe();

      const req = httpMock.expectOne('/api/auth/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);
      req.flush({ accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } });
    });

    it('should return LoginResponse', (done) => {
      const mockResponse = { accessToken: 'token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } };
      service.register({ email: 'test@test.com', password: 'password123' }).subscribe({
        next: (result) => {
          expect(result).toEqual(mockResponse);
          done();
        }
      });

      const req = httpMock.expectOne('/api/auth/register');
      req.flush(mockResponse);
    });
  });

  describe('login', () => {
    it('should send POST request to /api/auth/login', () => {
      const request = { email: 'test@test.com', password: 'password123' };

      service.login(request).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);
      req.flush({ accessToken: 'fake-token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } });
    });

    it('should store access token in localStorage', (done) => {
      service.login({ email: 'test@test.com', password: 'password123' }).subscribe({
        next: () => {
          expect(localStorage.getItem('accessToken')).toBe('fake-token');
          done();
        }
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({ accessToken: 'fake-token', user: { id: '1', email: 'test@test.com', createdAt: new Date() } });
    });

    it('should update currentUserSubject on successful login', (done) => {
      const email = 'test@test.com';
      const mockUser = { id: '1', email, createdAt: new Date() };

      service.currentUser$.subscribe(user => {
        if (user) {
          expect(user.email).toBe(email);
          done();
        }
      });

      service.login({ email, password: 'password123' }).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({ accessToken: 'fake-token', user: mockUser });
    });
  });

  describe('getAccessToken', () => {
    it('should return access token from localStorage', () => {
      localStorage.setItem('accessToken', 'stored-token');
      expect(service.getAccessToken()).toBe('stored-token');
    });

    it('should return null if no token in localStorage', () => {
      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if valid access token exists', () => {
      // Create a valid JWT token with expiration in the future
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const payload = { exp: futureTimestamp };
      const fakeToken = `header.${btoa(JSON.stringify(payload))}.signature`;
      localStorage.setItem('accessToken', fakeToken);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false if token is expired', () => {
      // Create an expired JWT token
      const pastTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const payload = { exp: pastTimestamp };
      const expiredToken = `header.${btoa(JSON.stringify(payload))}.signature`;
      localStorage.setItem('accessToken', expiredToken);
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return false if no access token exists', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return false if token is malformed', () => {
      localStorage.setItem('accessToken', 'invalid-token');
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('session management', () => {
    it('should store user in localStorage on login', (done) => {
      const mockUser = { id: '1', email: 'test@test.com', createdAt: new Date() };
      service.login({ email: 'test@test.com', password: 'password123' }).subscribe(() => {
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
        done();
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({ accessToken: 'fake-token', user: mockUser });
    });
  });

  describe('currentUser$', () => {
    it('should emit null initially when no user in storage', (done) => {
      service.currentUser$.subscribe(user => {
        expect(user).toBeNull();
        done();
      });
    });

    it('should emit user object after login', (done) => {
      const email = 'test@test.com';
      const mockUser = { id: '1', email, createdAt: new Date() };

      // Skip initial null
      let first = true;
      service.currentUser$.subscribe(user => {
        if (first) {
          first = false;
          return;
        }
        expect(user).not.toBeNull();
        expect(user?.email).toBe(email);
        done();
      });

      service.login({ email, password: 'password123' }).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({ accessToken: 'fake-token', user: mockUser });
    });
  });
});
