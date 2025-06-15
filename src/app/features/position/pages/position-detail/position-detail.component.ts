import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from 'src/app/core/services/position.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html'
})
export class PositionDetailComponent implements OnInit {
  position: any;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.positionService.getById(+id).subscribe(data => this.position = data);
    }
  }
}
