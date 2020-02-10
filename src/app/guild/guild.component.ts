import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  name: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.name = params['name'];
        if (this.name === "joe") {
          this.router.navigate(["/"]);
        }
      }
    );
  }

}
