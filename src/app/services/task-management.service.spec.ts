import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http'

import { TaskManagementService } from './task-management.service';

describe('TaskManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    expect(service).toBeTruthy();
  });
});
