import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-bet-dialog',
  templateUrl: './create-bet-dialog.component.html',
  styleUrls: ['./create-bet-dialog.component.scss'],
})
export class CreateBetDialogComponent {
  @Input() bet: any = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit(this.bet);
  }
}