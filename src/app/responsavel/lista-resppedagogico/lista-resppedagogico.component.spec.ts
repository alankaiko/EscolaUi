import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaResppedagogicoComponent } from './lista-resppedagogico.component';

describe('ListaResppedagogicoComponent', () => {
  let component: ListaResppedagogicoComponent;
  let fixture: ComponentFixture<ListaResppedagogicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaResppedagogicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaResppedagogicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
