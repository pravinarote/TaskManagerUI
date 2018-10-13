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
  
});
