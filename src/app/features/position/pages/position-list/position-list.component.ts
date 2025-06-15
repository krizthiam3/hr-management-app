import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Position } from 'src/app/core/models/position.model';
import { PositionService } from 'src/app/core/services/position.service';
import * as $ from 'jquery';
import 'datatables.net';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html'
})
export class PositionListComponent implements OnInit,  AfterViewInit {
  positions: Position[] = [];

  constructor(private positionService: PositionService, private router: Router ) {}

  
  ngOnInit(): void {
    this.loadData();
    }
  
    loadData()
    {
      this.positionService.getAll().subscribe(res => {
          this.positions = res;
        });
    }

  ngAfterViewInit(): void {
    setTimeout(() => {
      ($('#positionTable') as any).DataTable();
    }, 100);
  }  

editPosition(id: number) {
  this.router.navigate(['/positions/edit', id]);
}

  deletePosition(id: number) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.positionService.delete(id).subscribe({
        next: () => this.positions = this.positions.filter(p => p.id !== id), 
        error: err => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  
  isAdmin(): boolean {
  const token = localStorage.getItem('jwt');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Admin';
}

   goBackToList() {
    this.router.navigate(['home']); 
  }
  
}
