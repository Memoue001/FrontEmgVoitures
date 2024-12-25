import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoitureComponent } from './list-voiture.component';

describe('ListVoitureComponent', () => {
  let component: ListVoitureComponent;
  let fixture: ComponentFixture<ListVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
