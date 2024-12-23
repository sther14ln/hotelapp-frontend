import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

   

  constructor(
     
    //private loginService: LoginService
  ){}

  ngOnInit(): void {
      //this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    //this.loginService.logout();
  }

}
