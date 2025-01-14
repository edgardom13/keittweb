import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin/admin.component.service';
import { Carousel1Component, CarouselComponent } from './carrousel/carousel.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, Carousel1Component, NgxExtendedPdfViewerModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(private AdminService: AdminService,
    private sanitizer: DomSanitizer
  ) {}


  pdfUrl: SafeUrl = null as any;
  pdfUrl2: SafeUrl = null as any;
  unsafeUrl2: string = './assets/docs/DOCUMENTACIONKEITTWEB.pdf';
  unsafeUrl: string = './assets/docs/MANUALDEUSUARIOKEITTWEB.pdf';
  switchTheme = false;


  ngOnInit(): void {
    this.setTheme();
    this.loadPDF();
    this.loadPDF2();
  } 

  loadPDF(): void {
    // Asignar la URL al SafeUrl sin hacer cast a string
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
  }

  loadPDF2(): void {
    // Asignar la URL al SafeUrl sin hacer cast a string
    this.pdfUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl2);
  }

  logout() {
    this.AdminService.performLogout();
    console.log("Ha salido exitosamente");
  }

  changeTheme() {
    const toggleSwitch: HTMLInputElement = document.querySelector('.theme-switch input[type="checkbox"]')!;
    const imagen: HTMLImageElement = document.querySelector('#foto')!;
    const mainHeader: HTMLElement = document.querySelector('.main-header')!;
    const mainSidebar: HTMLElement = document.querySelector('.main-sidebar')!;
    
    if (this.switchTheme) {
      document.body.classList.add("dark-mode");
      imagen.src = 'dist/img/icono.png';
      mainHeader.classList.add('navbar-dark');
      mainHeader.classList.remove('navbar-light');
      mainSidebar.classList.add('sidebar-dark-primary');
      mainSidebar.classList.remove('sidebar-light-primary');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove("dark-mode");
      imagen.src = 'dist/img/icono.png';
      mainHeader.classList.add('navbar-light');
      mainHeader.classList.remove('navbar-dark');
      mainSidebar.classList.add('sidebar-light-primary');
      mainSidebar.classList.remove('sidebar-dark-primary');
      localStorage.setItem('theme', 'light');
    }
  }

  setTheme() {
    const currentTheme = localStorage.getItem('theme') ?? 'light';
    const toggleSwitch: HTMLInputElement = document.querySelector('.theme-switch input[type="checkbox"]')!;
    const imagen: HTMLImageElement = document.querySelector('#foto')!;
    const mainHeader: HTMLElement = document.querySelector('.main-header')!;
    const mainSidebar: HTMLElement = document.querySelector('.main-sidebar')!;
    
    if (currentTheme === 'dark') {
      document.body.classList.add("dark-mode");
      imagen.src = 'dist/img/icono.png';
      mainHeader.classList.add('navbar-dark');
      mainHeader.classList.remove('navbar-light');
      mainSidebar.classList.add('sidebar-dark-primary');
      mainSidebar.classList.remove('sidebar-light-primary');
      this.switchTheme = true;
    }
  }
}
