import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isOpen false by default', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should apply open class when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar.classList.contains('open')).toBeTruthy();
  });

  it('should not apply open class when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar.classList.contains('open')).toBeFalsy();
  });

  it('should emit closeSidebar when onClose is called', () => {
    spyOn(component.closeSidebar, 'emit');
    component.onClose();
    expect(component.closeSidebar.emit).toHaveBeenCalled();
  });

  it('should emit closeSidebar when onMenuClick is called', () => {
    spyOn(component.closeSidebar, 'emit');
    component.onMenuClick();
    expect(component.closeSidebar.emit).toHaveBeenCalled();
  });

  it('should render DataShare title', () => {
    const title = fixture.nativeElement.querySelector('.sidebar-title');
    expect(title.textContent).toBe('DataShare');
  });

  it('should render Mes fichiers navigation link', () => {
    const navLink = fixture.nativeElement.querySelector('.nav-item');
    expect(navLink.textContent).toContain('Mes fichiers');
  });

  it('should render copyright footer', () => {
    const copyright = fixture.nativeElement.querySelector('.copyright');
    expect(copyright.textContent).toBe('Copyright DataShare© 2025');
  });

  it('should have close button', () => {
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    expect(closeBtn).toBeTruthy();
  });

  it('should emit closeSidebar when close button is clicked', () => {
    spyOn(component.closeSidebar, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(component.closeSidebar.emit).toHaveBeenCalled();
  });

  it('should have routerLink to /history on nav item', () => {
    const navLink = fixture.nativeElement.querySelector('.nav-item');
    expect(navLink.getAttribute('ng-reflect-router-link')).toBe('/history');
  });
});
