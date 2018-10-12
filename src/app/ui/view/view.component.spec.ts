import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TaskNameFilterPipePipe } from '../../pipe/task-name-filter-pipe.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http'

import { ViewComponent } from './view.component';
import { by } from 'protractor';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,RouterTestingModule,HttpClientModule ],
      declarations: [ ViewComponent,TaskNameFilterPipePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.table'));
    element  = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table to display the tasks', () => {
    expect(element.innerHTML).toContain("td");
    expect(element.innerHTML).toContain("tr");
    expect(element.innerHTML).toContain("Task");
    expect(element.innerHTML).toContain("Parent");
  });

});
