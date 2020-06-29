import { Component, OnInit, Input } from '@angular/core';
import { Guild } from 'src/app/guild/guild.model';

@Component({
  selector: 'app-guild-preview',
  templateUrl: './guild-preview.component.html',
  styleUrls: ['./guild-preview.component.css']
})
export class GuildPreviewComponent {

  @Input() guild: Guild;

}
