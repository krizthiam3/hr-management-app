import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html'
})
export class DepartmentDetailComponent implements OnInit {
  department: any;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.departmentService.getById(+id).subscribe(data => this.department = data);
    }
  }
}
