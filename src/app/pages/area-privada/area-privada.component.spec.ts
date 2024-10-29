import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPrivadaComponent } from './area-privada.component';

describe('AreaPrivadaComponent', () => {
  let component: AreaPrivadaComponent;
  let fixture: ComponentFixture<AreaPrivadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPrivadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaPrivadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
