import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toBe('');
    expect(component.type).toBe('text');
    expect(component.placeholder).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.value).toBe('');
  });

  it('should update value on input', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.value).toBe('test value');
  });

  it('should call onChange callback on value change', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.onInput({ target: { value: 'new value' } } as any);
    expect(onChangeSpy).toHaveBeenCalledWith('new value');
  });

  it('should call onTouched callback on blur', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    component.onBlur();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should write value programmatically', () => {
    component.writeValue('programmatic value');
    expect(component.value).toBe('programmatic value');
  });

  it('should write empty string for undefined value', () => {
    component.writeValue('' as any);
    expect(component.value).toBe('');
  });

  it('should disable input when setDisabledState is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBeTruthy();
  });

  it('should enable input when setDisabledState is called with false', () => {
    component.setDisabledState(false);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBeFalsy();
  });

  it('should display label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.input-label');
    expect(label.textContent).toBe('Test Label');
  });

  it('should display error message when provided', () => {
    component.errorMessage = 'Error occurred';
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.input-error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Error occurred');
  });

  it('should set input type attribute', () => {
    component.type = 'email';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('should set input placeholder', () => {
    component.placeholder = 'Enter text...';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('placeholder')).toBe('Enter text...');
  });
});
