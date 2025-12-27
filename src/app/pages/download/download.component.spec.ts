import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError, Observable, Subject } from 'rxjs';
import { DownloadComponent } from './download.component';
import { DownloadService } from '../../services/download.service';
import { provideRouter } from '@angular/router';

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let downloadService: jasmine.SpyObj<DownloadService>;
  let paramsSubject: Subject<any>;

  beforeEach(async () => {
    const downloadServiceSpy = jasmine.createSpyObj('DownloadService', ['getFileInfo', 'downloadFile']);
    downloadServiceSpy.getFileInfo.and.returnValue(of({
      id: 'test-file-id',
      title: 'Test File',
      description: '',
      fileName: 'test.pdf',
      fileSize: 1024,
      downloadUrl: 'http://example.com',
      createdAt: '2025-12-23'
    }));

    paramsSubject = new Subject();

    await TestBed.configureTestingModule({
      imports: [DownloadComponent],
      providers: [
        { provide: DownloadService, useValue: downloadServiceSpy },
        { provide: ActivatedRoute, useValue: { params: paramsSubject.asObservable() } },
        provideRouter([])
      ]
    }).compileComponents();

    downloadService = TestBed.inject(DownloadService) as jasmine.SpyObj<DownloadService>;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should have fileId property of type string', () => {
      fixture = TestBed.createComponent(DownloadComponent);
      component = fixture.componentInstance;
      // fileId can be empty string or undefined before params are set
      expect(typeof component.fileId === 'string' || component.fileId === undefined).toBeTruthy();
    });

    it('should have loadFileInfo method', () => {
      fixture = TestBed.createComponent(DownloadComponent);
      component = fixture.componentInstance;
      expect(typeof component.loadFileInfo).toBe('function');
    });
  });

  describe('loadFileInfo', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DownloadComponent);
      component = fixture.componentInstance;
    });

    it('should set isLoading to true initially when loading', () => {
      // Create a delayed observable to capture the loading state
      let resolveObservable: any;
      const delayedObservable = new Observable(subscriber => {
        resolveObservable = () => {
          subscriber.next({
            id: 'test-file-id',
            title: 'Test File',
            description: '',
            fileName: 'test.pdf',
            fileSize: 1024,
            downloadUrl: 'http://example.com',
            createdAt: '2025-12-23'
          });
          subscriber.complete();
        };
      });

      downloadService.getFileInfo.and.returnValue(delayedObservable as any);

      component.loadFileInfo();

      // isLoading should be true before the observable completes
      expect(component.isLoading).toBe(true);

      // Complete the observable
      resolveObservable();
    });

    it('should clear errorMessage when loading', () => {
      component.errorMessage = 'Previous error';
      downloadService.getFileInfo.and.returnValue(of({
        id: 'test-file-id',
        title: 'Test File',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.loadFileInfo();

      expect(component.errorMessage).toBe('');
    });

    it('should call downloadService.getFileInfo with fileId', () => {
      component.fileId = 'abc123';
      downloadService.getFileInfo.and.returnValue(of({
        id: 'abc123',
        title: 'Test File',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      }));

      component.loadFileInfo();

      expect(downloadService.getFileInfo).toHaveBeenCalledWith('abc123');
    });

    it('should set fileInfo and isLoading on success', (done) => {
      const mockFileInfo = {
        id: 'test-file-id',
        title: 'Test File',
        description: 'Test Description',
        fileName: 'test.pdf',
        fileSize: 2048,
        downloadUrl: 'http://example.com/download',
        createdAt: '2025-12-23'
      };
      downloadService.getFileInfo.and.returnValue(of(mockFileInfo));

      component.loadFileInfo();

      setTimeout(() => {
        expect(component.fileInfo).toEqual(mockFileInfo);
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set isLoading to false on error', (done) => {
      const error = { error: { message: 'File not found' } };
      downloadService.getFileInfo.and.returnValue(throwError(() => error));

      component.loadFileInfo();

      setTimeout(() => {
        expect(component.isLoading).toBe(false);
        done();
      }, 0);
    });

    it('should set errorMessage on error', (done) => {
      const error = { error: { message: 'File not found' } };
      downloadService.getFileInfo.and.returnValue(throwError(() => error));

      component.loadFileInfo();

      setTimeout(() => {
        expect(component.errorMessage).toBe('File not found');
        done();
      }, 0);
    });

    it('should set default errorMessage when error has no message', (done) => {
      const error = { error: {} };
      downloadService.getFileInfo.and.returnValue(throwError(() => error));

      component.loadFileInfo();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Fichier non trouvé');
        done();
      }, 0);
    });
  });

  describe('downloadFile', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DownloadComponent);
      component = fixture.componentInstance;
      component.fileInfo = {
        id: 'test-file-id',
        title: 'Test File',
        description: '',
        fileName: 'test.pdf',
        fileSize: 1024,
        downloadUrl: 'http://example.com',
        createdAt: '2025-12-23'
      };
    });

    it('should call downloadService.downloadFile with fileId', () => {
      component.fileId = 'abc123';
      const mockBlob = new Blob(['content'], { type: 'application/pdf' });
      downloadService.downloadFile.and.returnValue(of(mockBlob));

      component.downloadFile();

      expect(downloadService.downloadFile).toHaveBeenCalledWith('abc123');
    });

    it('should create download link and trigger download on success', (done) => {
      const mockBlob = new Blob(['content'], { type: 'application/pdf' });
      downloadService.downloadFile.and.returnValue(of(mockBlob));

      spyOn(window.URL, 'createObjectURL').and.returnValue('blob:mock-url');
      spyOn(window.URL, 'revokeObjectURL');
      spyOn(document.body, 'appendChild');
      spyOn(document.body, 'removeChild');

      component.downloadFile();

      setTimeout(() => {
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
        expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
        expect(document.body.appendChild).toHaveBeenCalled();
        expect(document.body.removeChild).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should use fileName from fileInfo for download', (done) => {
      const mockBlob = new Blob(['content'], { type: 'application/pdf' });
      downloadService.downloadFile.and.returnValue(of(mockBlob));

      spyOn(window.URL, 'createObjectURL').and.returnValue('blob:mock-url');
      spyOn(window.URL, 'revokeObjectURL');

      let anchorElement: HTMLAnchorElement | null = null;
      spyOn(document.body, 'appendChild').and.callFake((node: any) => {
        anchorElement = node;
        return node;
      });
      spyOn(document.body, 'removeChild');

      component.downloadFile();

      setTimeout(() => {
        expect(anchorElement?.download).toBe('test.pdf');
        done();
      }, 0);
    });

    it('should use default filename when fileInfo has no fileName', (done) => {
      component.fileInfo = null;
      const mockBlob = new Blob(['content'], { type: 'application/pdf' });
      downloadService.downloadFile.and.returnValue(of(mockBlob));

      spyOn(window.URL, 'createObjectURL').and.returnValue('blob:mock-url');
      spyOn(window.URL, 'revokeObjectURL');

      let anchorElement: HTMLAnchorElement | null = null;
      spyOn(document.body, 'appendChild').and.callFake((node: any) => {
        anchorElement = node;
        return node;
      });
      spyOn(document.body, 'removeChild');

      component.downloadFile();

      setTimeout(() => {
        expect(anchorElement?.download).toBe('download');
        done();
      }, 0);
    });

    it('should set errorMessage on download error', (done) => {
      const error = { error: { message: 'Download failed' } };
      downloadService.downloadFile.and.returnValue(throwError(() => error));

      component.downloadFile();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Download failed');
        done();
      }, 0);
    });

    it('should set default errorMessage when download error has no message', (done) => {
      const error = { error: {} };
      downloadService.downloadFile.and.returnValue(throwError(() => error));

      component.downloadFile();

      setTimeout(() => {
        expect(component.errorMessage).toBe('Erreur lors du téléchargement');
        done();
      }, 0);
    });
  });

  describe('Initial properties', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DownloadComponent);
      component = fixture.componentInstance;
    });

    it('should have errorMessage initialized as empty string', () => {
      expect(component.errorMessage).toBe('');
    });
  });
});
