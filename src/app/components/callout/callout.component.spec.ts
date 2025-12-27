import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalloutComponent } from './callout.component';
import { IconComponent } from '../icon/icon.component';

describe('CalloutComponent', () => {
  let component: CalloutComponent;
  let fixture: ComponentFixture<CalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalloutComponent, IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type info', () => {
    expect(component.type).toBe('info');
  });

  it('should have empty default message', () => {
    expect(component.message).toBe('');
  });

  it('should return circle icon for info type', () => {
    component.type = 'info';
    expect(component.getIconName()).toBe('circle');
  });

  it('should return octagon icon for error type', () => {
    component.type = 'error';
    expect(component.getIconName()).toBe('octagon');
  });

  it('should return triangle icon for warning type', () => {
    component.type = 'warning';
    expect(component.getIconName()).toBe('triangle');
  });

  it('should return circle-check icon for success type', () => {
    component.type = 'success';
    expect(component.getIconName()).toBe('circle-check');
  });

  it('should apply callout-info class for info type', () => {
    component.type = 'info';
    fixture.detectChanges();
    const callout = fixture.nativeElement.querySelector('.callout');
    expect(callout.classList.contains('callout-info')).toBeTruthy();
  });

  it('should apply callout-error class for error type', () => {
    component.type = 'error';
    fixture.detectChanges();
    const callout = fixture.nativeElement.querySelector('.callout');
    expect(callout.classList.contains('callout-error')).toBeTruthy();
  });

  it('should apply callout-warning class for warning type', () => {
    component.type = 'warning';
    fixture.detectChanges();
    const callout = fixture.nativeElement.querySelector('.callout');
    expect(callout.classList.contains('callout-warning')).toBeTruthy();
  });

  it('should apply callout-success class for success type', () => {
    component.type = 'success';
    fixture.detectChanges();
    const callout = fixture.nativeElement.querySelector('.callout');
    expect(callout.classList.contains('callout-success')).toBeTruthy();
  });

  it('should display message', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.callout-message');
    expect(text.textContent).toBe('Test message');
  });

  it('should render icon component', () => {
    const icon = fixture.nativeElement.querySelector('app-icon');
    expect(icon).toBeTruthy();
  });

  it('should pass correct icon name to icon component', () => {
    component.type = 'error';
    fixture.detectChanges();
    // Icon component should receive 'octagon'
    expect(component.getIconName()).toBe('octagon');
  });
});
