import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCreateAgentComponent } from './c-create-agent.component';

describe('CCreateAgentComponent', () => {
  let component: CCreateAgentComponent;
  let fixture: ComponentFixture<CCreateAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCreateAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCreateAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
