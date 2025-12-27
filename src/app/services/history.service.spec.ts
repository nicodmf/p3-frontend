import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HistoryService } from './history.service';
import { AuthService } from './auth.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HistoryService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserFiles', () => {
    it('should send GET request to /api/files/history', () => {
      authService.getAccessToken.and.returnValue('fake-token');

      service.getUserFiles().subscribe();

      const req = httpMock.expectOne('/api/files/history');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should include Authorization header with Bearer token', () => {
      authService.getAccessToken.and.returnValue('fake-token');

      service.getUserFiles().subscribe();

      const req = httpMock.expectOne('/api/files/history');
      expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
      req.flush([]);
    });

    it('should return array of FileHistory', (done) => {
      authService.getAccessToken.and.returnValue('fake-token');

      const mockFiles = [
        {
          token: 'abc123',
          originalFileName: 'test.pdf',
          fileSize: 1024,
          createdAt: '2025-12-23T00:00:00Z',
          expiresAt: '2025-12-24T00:00:00Z',
          isActive: true,
          tags: [],
          requiresPassword: false
        }
      ];

      service.getUserFiles().subscribe(files => {
        expect(files.length).toBe(1);
        expect(files[0].token).toBe('abc123');
        expect(files[0].originalFileName).toBe('test.pdf');
        done();
      });

      const req = httpMock.expectOne('/api/files/history');
      req.flush(mockFiles);
    });
  });

  describe('deleteFile', () => {
    it('should send DELETE request to /api/files/:id', () => {
      authService.getAccessToken.and.returnValue('fake-token');

      service.deleteFile('abc123').subscribe();

      const req = httpMock.expectOne('/api/files/abc123');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should include Authorization header with Bearer token', () => {
      authService.getAccessToken.and.returnValue('fake-token');

      service.deleteFile('abc123').subscribe();

      const req = httpMock.expectOne('/api/files/abc123');
      expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
      req.flush(null);
    });

    it('should complete successfully', (done) => {
      authService.getAccessToken.and.returnValue('fake-token');

      service.deleteFile('abc123').subscribe({
        next: () => {
          expect(true).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne('/api/files/abc123');
      req.flush(null);
    });
  });
});
