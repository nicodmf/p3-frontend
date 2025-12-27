import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toBe('');
    expect(component.placeholder).toBe('Sélectionnez une option');
    expect(component.errorMessage).toBe('');
    expect(component.options).toEqual([]);
    expect(component.value).toBe('');
  });

  it('should update value on selection change', () => {
    component.options = [{ value: 'option1', label: 'Option 1' }];
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    select.value = 'option1';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.value).toBe('option1');
  });

  it('should call onChange callback on value change', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.onSelectChange({ target: { value: 'option2' } } as any);
    expect(onChangeSpy).toHaveBeenCalledWith('option2');
  });

  it('should call onTouched callback on blur', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    component.onBlur();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should write value programmatically', () => {
    component.writeValue('programmatic');
    expect(component.value).toBe('programmatic');
  });

  it('should write empty string for undefined value', () => {
    component.writeValue('' as any);
    expect(component.value).toBe('');
  });

  it('should disable select when setDisabledState is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select');
    expect(select.disabled).toBeTruthy();
  });

  it('should display label', () => {
    component.label = 'Select Label';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.select-label');
    expect(label.textContent).toBe('Select Label');
  });

  it('should display error message when provided', () => {
    component.errorMessage = 'Selection required';
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.select-error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Selection required');
  });

  it('should render options', () => {
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ];
    fixture.detectChanges();
    const options = fixture.nativeElement.querySelectorAll('option');
    // +1 for placeholder option
    expect(options.length).toBe(3);
    expect(options[1].value).toBe('1');
    expect(options[1].textContent).toContain('Option 1');
    expect(options[2].value).toBe('2');
    expect(options[2].textContent).toContain('Option 2');
  });

  it('should display placeholder option', () => {
    component.placeholder = 'Choose one...';
    fixture.detectChanges();
    const placeholder = fixture.nativeElement.querySelector('option[value=""]');
    expect(placeholder.textContent).toContain('Choose one...');
  });
});
