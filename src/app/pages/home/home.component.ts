import { Component } from '@angular/core';
import { BannerVideoComponent } from '../../components/home-components/banner-video/banner-video.component';
import { HomeMainComponent } from '../../components/home-components/home-main/home-main.component';
import { CookieConsentComponent } from '../../components/cookies/cookie-consent/cookie-consent.component';

/**
 * Componente principal de la página de inicio.
 *
 * @export
 * @class HomeComponent
 * @typedef {HomeComponent}
 */
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [BannerVideoComponent, HomeMainComponent, CookieConsentComponent],
})
export class HomeComponent {}
