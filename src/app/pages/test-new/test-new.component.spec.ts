import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNewComponent } from './test-new.component';

describe('TestNewComponent', () => {
  let component: TestNewComponent;
  let fixture: ComponentFixture<TestNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
