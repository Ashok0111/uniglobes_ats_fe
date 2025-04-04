import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventsComponent } from './list-events.component';

describe('ListBlogsComponent', () => {
  let component: ListEventsComponent;
  let fixture: ComponentFixture<ListEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
