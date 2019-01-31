import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-icon-modal',
  templateUrl: './select-icon-modal.page.html',
  styleUrls: ['./select-icon-modal.page.scss'],
})
export class SelectIconModalPage implements OnInit {

  public icons: string [][];


  constructor(public modalController: ModalController) {
    this.icons = [
      ['football', 'bus', 'car', 'train'],
      ['basket', 'beer', 'cart', 'bonfire'],
      ['ice-cream', 'nutrition','pizza', 'pint'],
      ['pricetag', 'shirt', 'watch', 'glasses' ],
      ['cafe', 'happy', 'heart', 'bowtie'],
      ['school', 'construct', 'cog', 'hammer'],
      ['tablet-portrait', 'radio', 'headset', 'desktop']
    ]

   }

  ngOnInit() {
  }

  public async dismissWithSelectedIcon(selectedIcon: string): Promise<void> {
   await this.modalController.dismiss(selectedIcon);
  }


}
