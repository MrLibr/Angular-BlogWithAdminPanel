
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AlertConstants from 'src/constants/alert-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { AlertService } from '../../services/alert.service';
import { AuthService } from './../../services/auth.service';


@Component( {
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [ './admin-layout.component.scss' ]
} )
export class AdminLayoutComponent implements OnInit {

  public homePage: string;
  public createPage: string[];
  public dashboardPage: string[];

  constructor (
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.homePage = RoutingConstants.HOME_PAGE;
    this.createPage = [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_CREATE_PAGE ];
    this.dashboardPage = [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_DASHBOARD_PAGE ];
  }

  ngOnInit(): void {
  }

  logout( event: MouseEvent ): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate( [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_LOGIN_PAGE ] );
    this.alertService.danger( AlertConstants.SUCCESS_LOGOUT );
  }
}
