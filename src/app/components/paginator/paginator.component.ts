import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() rows: number = 5;
  @Input() totalRecords: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: any) {
    this.pageChange.emit(event.page);
  }
}
