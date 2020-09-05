import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadResppedagogicoComponent } from './cad-resppedagogico.component';

describe('CadResppedagogicoComponent', () => {
  let component: CadResppedagogicoComponent;
  let fixture: ComponentFixture<CadResppedagogicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadResppedagogicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadResppedagogicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
