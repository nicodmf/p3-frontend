import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name circle', () => {
    expect(component.name).toBe('circle');
  });

  it('should return correct viewBox for circle', () => {
    component.name = 'circle';
    expect(component.getViewBox()).toBe('0 0 512 512');
  });

  it('should return correct viewBox for octagon', () => {
    component.name = 'octagon';
    expect(component.getViewBox()).toBe('0 0 512 512');
  });

  it('should return correct viewBox for triangle', () => {
    component.name = 'triangle';
    expect(component.getViewBox()).toBe('0 0 576 512');
  });

  it('should return correct viewBox for circle-check', () => {
    component.name = 'circle-check';
    expect(component.getViewBox()).toBe('0 0 512 512');
  });

  it('should return correct viewBox for upload', () => {
    component.name = 'upload';
    expect(component.getViewBox()).toBe('0 0 16 14');
  });

  it('should return correct stroke width for upload', () => {
    component.name = 'upload';
    expect(component.getStrokeWidth()).toBe('1.6');
  });

  it('should return correct stroke width for other icons', () => {
    component.name = 'circle';
    expect(component.getStrokeWidth()).toBe('32');
  });

  it('should render SVG element', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should apply correct viewBox attribute', () => {
    component.name = 'triangle';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 576 512');
  });

  it('should render circle and line for circle icon', () => {
    component.name = 'circle';
    fixture.detectChanges();
    const circles = fixture.nativeElement.querySelectorAll('circle');
    const lines = fixture.nativeElement.querySelectorAll('line');
    expect(circles.length).toBeGreaterThan(0);
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should render octagon paths for octagon icon', () => {
    component.name = 'octagon';
    fixture.detectChanges();
    const paths = fixture.nativeElement.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should render triangle path for triangle icon', () => {
    component.name = 'triangle';
    fixture.detectChanges();
    const path = fixture.nativeElement.querySelector('path');
    expect(path).toBeTruthy();
  });

  it('should render circle and polyline for circle-check icon', () => {
    component.name = 'circle-check';
    fixture.detectChanges();
    const circles = fixture.nativeElement.querySelectorAll('circle');
    const polylines = fixture.nativeElement.querySelectorAll('polyline');
    expect(circles.length).toBeGreaterThan(0);
    expect(polylines.length).toBeGreaterThan(0);
  });

  it('should render upload paths for upload icon', () => {
    component.name = 'upload';
    fixture.detectChanges();
    const paths = fixture.nativeElement.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });
});
