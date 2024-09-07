import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiembraComponent } from './siembra.component';

describe('SiembraComponent', () => {
  let component: SiembraComponent;
  let fixture: ComponentFixture<SiembraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiembraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
