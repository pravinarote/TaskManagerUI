import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TaskNameFilterPipePipe } from '../../pipe/task-name-filter-pipe.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http'
import  { DataTableModule } from  'angular-6-datatable'
import { ViewComponent } from './view.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskManagementService } from 'src/app/services/task-management.service';
import { TaskManagementMockService } from 'src/app/services/task-management-mock.service';
import { RouterMock } from '../mock/router-mock';
import { ActivatedRouteMock } from '../mock/activated-route-mock';


describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let router : Router;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,RouterTestingModule,HttpClientModule,DataTableModule ],
      declarations: [ ViewComponent,TaskNameFilterPipePipe ],
      providers: [
        { provide: TaskManagementService, useClass: TaskManagementMockService },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock }
    ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.table'));
    element  = de.nativeElement;
    
  });

  it('should create view component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table to display the tasks', () => {
    expect(element.innerHTML).toContain("td");
    expect(element.innerHTML).toContain("tr");
    expect(element.innerHTML).toContain("Task");
    expect(element.innerHTML).toContain("Parent");
  });

  it('should call update route', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.updateTask(23);
    const url = spy.calls.first().args[0];
    expect(url).toBe('/Update/23');
  });

  it('should load all tasks ngOnInit', () => {
    component.ngOnInit();
    expect(component.taskList.length).toBe(4);
  });

  it('when end task called then validate task', () => {
    component.endTask(1);
    var endedTask = component.taskList.filter(x=> x.TaskId == 1)[0];
    expect(endedTask.IsTaskEnded).toBeTruthy();
  });

  it('when delete task called then validate task and collection', () => {
    component.deleteTask(1);
    expect(component.taskList.length).toBe(3);
  });

});
