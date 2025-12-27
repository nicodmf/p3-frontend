import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError, Subject, Observable } from 'rxjs';
import { HistoryComponent } from './history.component';
import { HistoryService, FileHistory } from '../../services/history.service';
import { SidebarService } from '../../services/sidebar.service';
import { provideRouter } from '@angular/router';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService: jasmine.SpyObj<HistoryService>;
  let sidebarService: jasmine.SpyObj<SidebarService>;
  let toggleSubject: Subject<void>;

  beforeEach(async () => {
    toggleSubject = new Subject<void>();
    const historyServiceSpy = jasmine.createSpyObj('HistoryService', ['getUserFiles', 'deleteFile']);
    const sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['toggle'], {
      toggle$: toggleSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [
        { provide: HistoryService, useValue: historyServiceSpy },
        { provide: SidebarService, useValue: sidebarServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    sidebarService = TestBed.inject(SidebarService) as jasmine.SpyObj<SidebarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadHistory', () => {
      historyService.getUserFiles.and.returnValue(of([]));
      spyOn(component, 'loadHistory');

      component.ngOnInit();

      expect(component.loadHistory).toHaveBeenCalled();
    });

    it('should subscribe to sidebarService toggle$', () => {
      historyService.getUserFiles.and.returnValue(of([]));

      component.ngOnInit();
      component.isSidebarOpen = false;

      toggleSubject.next();

      expect(component.isSidebarOpen).toBe(true);
    });

    it('should toggle sidebar when toggle$ emits', () => {
      historyService.getUserFiles.and.returnValue(of([]));

      component.ngOnInit();
      component.isSidebarOpen = false;

      toggleSubject.next();
      expect(component.isSidebarOpen).toBe(true);

      toggleSubject.next();
      expect(component.isSidebarOpen).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from sidebarSubscription', () => {
      historyService.getUserFiles.and.returnValue(of([]));
      component.ngOnInit();

      const subscription = component['sidebarSubscription'];
      spyOn(subscription!, 'unsubscribe');

      component.ngOnDestroy();

      expect(subscription!.unsubscribe).toHaveBeenCalled();
    });

    it('should handle missing subscription gracefully', () => {
      component['sidebarSubscription'] = undefined;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('toggleSidebar', () => {
    it('should toggle isSidebarOpen from false to true', () => {
      component.isSidebarOpen = false;

      component.toggleSidebar();

      expect(component.isSidebarOpen).toBe(true);
    });

    it('should toggle isSidebarOpen from true to false', () => {
      component.isSidebarOpen = true;

      component.toggleSidebar();

      expect(component.isSidebarOpen).toBe(false);
    });
  });

  describe('closeSidebar', () => {
    it('should set isSidebarOpen to false', () => {
      component.isSidebarOpen = true;

      component.closeSidebar();

      expect(component.isSidebarOpen).toBe(false);
    });
  });

  describe('loadHistory', () => {
    it('should set isLoading to true initially when loading', () => {
      // Create a delayed observable to capture the loading state
      let resolveObservable: any;
      const delayedObservable = new Observable<FileHistory[]>(subscriber => {
        resolveObservable = () => {
          subscriber.next([]);
          subscriber.complete();
        };
      });

      historyService.getUserFiles.and.returnValue(delayedObservable);

      component.loadHistory();

      // isLoading should be true before the observable completes
      expect(component.isLoading).toBe(true);

      // Complete the observable
      resolveObservable();
    });

    it('should clear errorMessage when loading', () => {
      component.errorMessage = 'Previous error';
      historyService.getUserFiles.and.returnValue(of([]));

      component.loadHistory();

      expect(component.errorMessage).toBe('');
    });

    it('should call historyService.getUserFiles', () => {
      historyService.getUserFiles.and.returnValue(of([]));

      component.loadHistory();

      expect(historyService.getUserFiles).toHaveBeenCalled();
    });

    it('should set files and isLoading on success', (done) => {
      const mockFiles: FileHistory[] = [
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
      historyService.getUserFiles.and.returnValue(of(mockFiles));

      component.loadHistory();

      setTimeout(() => {
        expect(component.files).toEqual(mockFiles);
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set isLoading to false on error', (done) => {
      const error = { error: { message: 'Failed to load' } };
      historyService.getUserFiles.and.returnValue(throwError(() => error));

      component.loadHistory();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set errorMessage on error', (done) => {
      const error = { error: { message: 'Failed to load history' } };
      historyService.getUserFiles.and.returnValue(throwError(() => error));

      component.loadHistory();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Failed to load history');
        done();
      }, 0);
    });

    it('should set default errorMessage when error has no message', (done) => {
      const error = { error: {} };
      historyService.getUserFiles.and.returnValue(throwError(() => error));

      component.loadHistory();

      setTimeout(() => {
        expect(component.errorMessage).toBe("Erreur lors du chargement de l'historique");
        done();
      }, 0);
    });
  });

  describe('formatFileSize', () => {
    it('should return "0 Bytes" for 0 bytes', () => {
      expect(component.formatFileSize(0)).toBe('0 Bytes');
    });

    it('should format bytes correctly', () => {
      expect(component.formatFileSize(500)).toBe('500 Bytes');
    });

    it('should format KB correctly', () => {
      expect(component.formatFileSize(1024)).toBe('1 KB');
      expect(component.formatFileSize(2048)).toBe('2 KB');
    });

    it('should format MB correctly', () => {
      expect(component.formatFileSize(1048576)).toBe('1 MB');
      expect(component.formatFileSize(2097152)).toBe('2 MB');
    });

    it('should format GB correctly', () => {
      expect(component.formatFileSize(1073741824)).toBe('1 GB');
    });

    it('should round to 2 decimal places', () => {
      const result = component.formatFileSize(1536);
      expect(result).toBe('1.5 KB');
    });
  });

  describe('formatDate', () => {
    it('should format date in French locale', () => {
      const dateString = '2025-12-23T14:30:00Z';
      const result = component.formatDate(dateString);
      expect(result).toContain('2025');
      expect(result).toContain('décembre');
      expect(result).toContain('23');
    });

    it('should include time in formatted date', () => {
      const dateString = '2025-12-23T14:30:00Z';
      const result = component.formatDate(dateString);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });
  });

  describe('deleteFile', () => {
    beforeEach(() => {
      component.files = [
        {
          token: 'abc123',
          originalFileName: 'test.pdf',
          fileSize: 1024,
          createdAt: '2025-12-23T00:00:00Z',
          expiresAt: '2025-12-24T00:00:00Z',
          isActive: true,
          tags: [],
          requiresPassword: false
        },
        {
          token: 'xyz789',
          originalFileName: 'test2.pdf',
          fileSize: 2048,
          createdAt: '2025-12-23T00:00:00Z',
          expiresAt: '2025-12-24T00:00:00Z',
          isActive: true,
          tags: [],
          requiresPassword: false
        }
      ];
    });

    it('should prompt for confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteFile('abc123');

      expect(window.confirm).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer ce fichier ?');
    });

    it('should not call historyService.deleteFile if not confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteFile('abc123');

      expect(historyService.deleteFile).not.toHaveBeenCalled();
    });

    it('should call historyService.deleteFile with token if confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      historyService.deleteFile.and.returnValue(of(void 0));

      component.deleteFile('abc123');

      expect(historyService.deleteFile).toHaveBeenCalledWith('abc123');
    });

    it('should remove file from files array on success', (done) => {
      spyOn(window, 'confirm').and.returnValue(true);
      historyService.deleteFile.and.returnValue(of(void 0));

      component.deleteFile('abc123');

      setTimeout(() => {
        expect(component.files.length).toBe(1);
        expect(component.files[0].token).toBe('xyz789');
        done();
      }, 0);
    });

    it('should set errorMessage on delete error', (done) => {
      spyOn(window, 'confirm').and.returnValue(true);
      const error = { error: { message: 'Delete failed' } };
      historyService.deleteFile.and.returnValue(throwError(() => error));

      component.deleteFile('abc123');

      setTimeout(() => {
        expect(component.errorMessage).toBe('Delete failed');
        done();
      }, 0);
    });

    it('should set default errorMessage when delete error has no message', (done) => {
      spyOn(window, 'confirm').and.returnValue(true);
      const error = { error: {} };
      historyService.deleteFile.and.returnValue(throwError(() => error));

      component.deleteFile('abc123');

      setTimeout(() => {
        expect(component.errorMessage).toBe('Erreur lors de la suppression');
        done();
      }, 0);
    });
  });

  describe('getStatusBadgeText', () => {
    it('should return "Actif" for active files', () => {
      const file: FileHistory = {
        token: 'abc123',
        originalFileName: 'test.pdf',
        fileSize: 1024,
        createdAt: '2025-12-23T00:00:00Z',
        expiresAt: '2025-12-24T00:00:00Z',
        isActive: true,
        tags: [],
        requiresPassword: false
      };

      expect(component.getStatusBadgeText(file)).toBe('Actif');
    });

    it('should return "Expiré" for inactive files', () => {
      const file: FileHistory = {
        token: 'abc123',
        originalFileName: 'test.pdf',
        fileSize: 1024,
        createdAt: '2025-12-23T00:00:00Z',
        expiresAt: '2025-12-24T00:00:00Z',
        isActive: false,
        tags: [],
        requiresPassword: false
      };

      expect(component.getStatusBadgeText(file)).toBe('Expiré');
    });
  });

  describe('getStatusBadgeClass', () => {
    it('should return "badge-active" for active files', () => {
      const file: FileHistory = {
        token: 'abc123',
        originalFileName: 'test.pdf',
        fileSize: 1024,
        createdAt: '2025-12-23T00:00:00Z',
        expiresAt: '2025-12-24T00:00:00Z',
        isActive: true,
        tags: [],
        requiresPassword: false
      };

      expect(component.getStatusBadgeClass(file)).toBe('badge-active');
    });

    it('should return "badge-expired" for inactive files', () => {
      const file: FileHistory = {
        token: 'abc123',
        originalFileName: 'test.pdf',
        fileSize: 1024,
        createdAt: '2025-12-23T00:00:00Z',
        expiresAt: '2025-12-24T00:00:00Z',
        isActive: false,
        tags: [],
        requiresPassword: false
      };

      expect(component.getStatusBadgeClass(file)).toBe('badge-expired');
    });
  });

  describe('Properties', () => {
    it('should initialize files as empty array', () => {
      expect(component.files).toEqual([]);
    });

    it('should initialize isLoading as true', () => {
      expect(component.isLoading).toBe(true);
    });

    it('should initialize errorMessage as empty string', () => {
      expect(component.errorMessage).toBe('');
    });

    it('should initialize isSidebarOpen as false', () => {
      expect(component.isSidebarOpen).toBe(false);
    });
  });
});
