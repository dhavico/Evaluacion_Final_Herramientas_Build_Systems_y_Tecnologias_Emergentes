import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataApiService } from 'src/app/service/data-api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private dataApi: DataApiService, private route: Router) { }
  ngOnInit() {
    
  }

  logout(){
    this.authService.logoutUser();
  }

  carrito(){
    this.route.navigateByUrl('main(principal:carrito)')
  }

  principal(){
    this.route.navigateByUrl('main(principal:lista)')
  }
}
