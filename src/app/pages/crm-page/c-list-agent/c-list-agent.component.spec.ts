import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CListAgentComponent } from './c-list-agent.component';

describe('CListAgentComponent', () => {
  let component: CListAgentComponent;
  let fixture: ComponentFixture<CListAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CListAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CListAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
