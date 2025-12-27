import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('medium');
    expect(component.type).toBe('button');
    expect(component.disabled).toBe(false);
    expect(component.label).toBe('Bouton');
  });

  it('should apply primary variant class', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-primary')).toBeTruthy();
  });

  it('should apply secondary variant class', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-secondary')).toBeTruthy();
  });

  it('should apply tertiary variant class', () => {
    component.variant = 'tertiary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-tertiary')).toBeTruthy();
  });

  it('should apply quaternary variant class', () => {
    component.variant = 'quaternary';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-quaternary')).toBeTruthy();
  });


  it('should apply small size class', () => {
    component.size = 'small';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-small')).toBeTruthy();
  });

  it('should apply medium size class', () => {
    component.size = 'medium';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-medium')).toBeTruthy();
  });

  it('should apply large size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-large')).toBeTruthy();
  });

  it('should set button type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should disable button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should emit clicked event when button is clicked', () => {
    spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when button is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should display label text', () => {
    component.label = 'Test Button';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Test Button');
  });

  it('should support content projection when label is empty', () => {
    component.label = '';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    // Button should exist even without label
    expect(button).toBeTruthy();
  });
});
