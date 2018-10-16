import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule ],
      declarations: [ UpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create update component and resolve all dependencies', () => {
    expect(component).toBeTruthy();
  });

  it("When No Values filled form should be invalid", () => { 
    expect(component).toBeTruthy(); 
    expect(component.angularForm.valid).toBe(false); 
  }); 

  it('task name field validity', () => {
    let errors = {};
    let taskName = component.angularForm.controls['name'];
    errors = taskName.errors || {};
    expect(errors['required']).toBeTruthy(); 
  });

  it("when task name has given then task mandatory validator should pass", () => { 
    expect(component).toBeTruthy(); 

    component.angularForm.controls['name'].setValue('New Task added'); 
    expect(component.angularForm.controls['name'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  }); 

  it('parent task field should be valid if no values are assigned but entire form should invalid', () => {
    let errors = {};
    let parentTask = component.angularForm.controls['parentTask'];
    errors = parentTask.errors || {};
    expect(errors['required']).toBeUndefined(); 
    expect(component.angularForm.controls['parentTask'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('parent task field should be valid if some values are assigned but entire form should invalid', () => {
    let parentTask = component.angularForm.controls['parentTask'];
    parentTask.setValue('1');
    expect(component.angularForm.controls['parentTask'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('priority field should be invalid if no value assigned but entire form should invalid', () => {
    let errors = {};
    let priority = component.angularForm.controls['priority'];
    errors = priority.errors || {};
    expect(errors['required']).toBe(true); 
    expect(component.angularForm.controls['priority'].valid).toBe(false); 
  });

  it('priority field should be invalid if no value assigned but entire form should invalid', () => {
    let errors = {};
    let priority = component.angularForm.controls['priority'];
    priority.setValue(-15);
    errors = priority.errors || {};
    expect(component.angularForm.controls['priority'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('start date field required validity', () => {
    let errors = {};
    let startDate = component.angularForm.controls['startDate'];
    errors = startDate.errors || {};
    expect(errors['required']).toBe(true); 
    expect(component.angularForm.controls['startDate'].valid).toBe(false); 
  });

  it('start date field should pass if value supplied', () => {
    let errors = {};
    let startDate = component.angularForm.controls['startDate'];
    startDate.setValue(new Date(2019,12,1));
    errors = startDate.errors || {};
    expect(errors['required']).toBeUndefined(); 
    expect(component.angularForm.controls['startDate'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('end date field required validity', () => {
    let errors = {};
    let endDate = component.angularForm.controls['endDate'];
    errors = endDate.errors || {};
    expect(errors['required']).toBe(true); 
    expect(component.angularForm.controls['endDate'].valid).toBe(false); 
  });

  it('end date field should pass if value supplied', () => {
    let errors = {};
    let endDate = component.angularForm.controls['endDate'];
    endDate.setValue(new Date(2019,12,1));
    errors = endDate.errors || {};
    expect(errors['required']).toBeUndefined(); 
    expect(component.angularForm.controls['endDate'].valid).toBe(true); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('start date is greater than end date field then validation should display', () => {
    let startDate = component.angularForm.controls['startDate'];
    let endDate = component.angularForm.controls['endDate'];
    startDate.setValue(new Date(2019,12,1));
    endDate.setValue(new Date(2009,12,1));
    component.compareTwoDates();
    expect(component.error.errorMessage).toBe('End Date should not greater than start date.'); 
    expect(component.angularForm.valid).toBe(false); 
  });
    
  it('start date is greater than end date field then validation should not display', () => {
    let startDate = component.angularForm.controls['startDate'];
    let endDate = component.angularForm.controls['endDate'];
    startDate.setValue(new Date(2009,12,1));
    endDate.setValue(new Date(2019,12,1));
    component.compareTwoDates();
    expect(component.error.errorMessage).toBe(''); 
    expect(component.angularForm.valid).toBe(false); 
  });

  it('if all fields has been supplied then form should be valid', () => {

    let priority = component.angularForm.controls['priority'];
    let taskName = component.angularForm.controls['name'];
    let parentTask = component.angularForm.controls['parentTask'];
    let startDate = component.angularForm.controls['startDate'];
    let endDate = component.angularForm.controls['endDate'];

    taskName.setValue('New Task');
    parentTask.setValue(1);
    priority.setValue(12);
    startDate.setValue(new Date(2009,12,1));
    endDate.setValue(new Date(2019,12,1));

    expect(component.angularForm.valid).toBe(true); 
  });

});
