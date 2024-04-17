import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarquitoComponent } from './barquito.component';

describe('BarquitoComponent', () => {
  let component: BarquitoComponent;
  let fixture: ComponentFixture<BarquitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarquitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
