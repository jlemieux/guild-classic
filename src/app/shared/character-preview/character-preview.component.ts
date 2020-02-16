import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/character/character.model';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.css']
})
export class CharacterPreviewComponent {

  @Input() character: Character;

}
