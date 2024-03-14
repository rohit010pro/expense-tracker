import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormrfComponent } from './formrf.component';

describe('FormrfComponent', () => {
  let component: FormrfComponent;
  let fixture: ComponentFixture<FormrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormrfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
