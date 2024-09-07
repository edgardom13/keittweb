import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../admin/admin.component.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private AdminService: AdminService, private router: Router) {}

  switchTheme = false; 

  ngOnInit(): void {
    this.setTheme();
  }

    
  logout() {
    //console.log(localStorage.getItem('token'))
    this.AdminService.performLogout();
    console.log("ha salido exitosamente")
  }

  changeTheme(){
    const toggleSwitch : HTMLInputElement = document.querySelector('.theme-switch input[type="checkbox"]')!;
    const imagen: HTMLImageElement = document.querySelector('#foto')!;
    const mainHeader : HTMLElement = document.querySelector('.main-header')!;
    const mainSidebar : HTMLElement = document.querySelector('.main-sidebar')!;
    if (this.switchTheme) {
      if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add("dark-mode");
        imagen.src = 'dist/img/icono.png';
      }
      if (mainHeader.classList.contains('navbar-light')) {
        mainHeader.classList.add('navbar-dark');
        mainHeader.classList.remove('navbar-light');
      }
      if (mainSidebar.classList.contains('sidebar-light-primary')) {
        mainSidebar.classList.add('sidebar-dark-primary');
        mainSidebar.classList.remove('sidebar-light-primary');
      }

      localStorage.setItem('theme', 'dark');
    } else {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove("dark-mode");
        imagen.src = 'dist/img/icono.png';
      }
      if (mainHeader.classList.contains('navbar-dark')) {
        mainHeader.classList.add('navbar-light');
        mainHeader.classList.remove('navbar-dark');
      }
      if (mainSidebar.classList.contains('sidebar-dark-primary')) {
        mainSidebar.classList.add('sidebar-light-primary');
        mainSidebar.classList.remove('sidebar-dark-primary');          
      }
      localStorage.setItem('theme', 'light');
    }
  }
  
  setTheme(){
    const currentTheme = localStorage.getItem('theme') ?? 'light';
    const toggleSwitch : HTMLInputElement = document.querySelector('.theme-switch input[type="checkbox"]')!;
    const imagen: HTMLImageElement = document.querySelector('#foto')!;
    const mainHeader : HTMLElement = document.querySelector('.main-header')!;
    const mainSidebar : HTMLElement = document.querySelector('.main-sidebar')!;
    if (currentTheme) {
      if (currentTheme === 'dark') {
        if (!document.body.classList.contains('dark-mode')) {
          document.body.classList.add("dark-mode");
          imagen.src = 'dist/img/icono.png';
        }
        if (mainHeader.classList.contains('navbar-light')) {
          mainHeader.classList.add('navbar-dark');
          mainHeader.classList.remove('navbar-light');
        }
        if (mainSidebar.classList.contains('sidebar-light-primary')) {
          mainSidebar.classList.add('sidebar-dark-primary');
          mainSidebar.classList.remove('sidebar-light-primary');
        }
        this.switchTheme = true
      }
    }
  }

}
