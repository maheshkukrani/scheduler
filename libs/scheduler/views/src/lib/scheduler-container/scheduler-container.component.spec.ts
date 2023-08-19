import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulerContainerComponent } from './scheduler-container.component';

describe('SchedulerContainerComponent', () => {
  let component: SchedulerContainerComponent;
  let fixture: ComponentFixture<SchedulerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchedulerContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
