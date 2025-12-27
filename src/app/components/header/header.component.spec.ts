import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let sidebarService: jasmine.SpyObj<SidebarService>;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'currentUser$']);
    const sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['toggle']);
    routerEventsSubject = new Subject();

    authServiceSpy.currentUser$ = of(null);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SidebarService, useValue: sidebarServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    sidebarService = TestBed.inject(SidebarService) as jasmine.SpyObj<SidebarService>;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isUserMenuOpen false by default', () => {
    expect(component.isUserMenuOpen).toBe(false);
  });

  it('should have hasSidebar false by default', () => {
    expect(component.hasSidebar).toBe(false);
  });

  it('should toggle user menu when toggleUserMenu is called', () => {
    expect(component.isUserMenuOpen).toBe(false);
    component.toggleUserMenu();
    expect(component.isUserMenuOpen).toBe(true);
    component.toggleUserMenu();
    expect(component.isUserMenuOpen).toBe(false);
  });

  it('should call sidebarService.toggle when onToggleSidebar is called', () => {
    component.onToggleSidebar();
    expect(sidebarService.toggle).toHaveBeenCalled();
  });

  it('should set hasSidebar to true for /history route', () => {
    component['updateSidebarState']('/history');
    expect(component.hasSidebar).toBe(true);
  });

  it('should set hasSidebar to false for /upload route', () => {
    component['updateSidebarState']('/upload');
    expect(component.hasSidebar).toBe(false);
  });

  it('should set hasSidebar to false for /login route', () => {
    component['updateSidebarState']('/login');
    expect(component.hasSidebar).toBe(false);
  });

  it('should call localStorage.clear and navigate to /login on logout', () => {
    spyOn(localStorage, 'clear');
    const navigateSpy = spyOn((component as any).router, 'navigate');

    component.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should close user menu on logout', () => {
    component.isUserMenuOpen = true;
    component.logout();
    expect(component.isUserMenuOpen).toBe(false);
  });

  it('should render header element', () => {
    const header = fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('should apply header-with-sidebar class when hasSidebar is true', () => {
    component.hasSidebar = true;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('header');
    expect(header.classList.contains('header-with-sidebar')).toBeTruthy();
  });

  it('should not apply header-with-sidebar class when hasSidebar is false', () => {
    component.hasSidebar = false;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('header');
    expect(header.classList.contains('header-with-sidebar')).toBeFalsy();
  });
});
