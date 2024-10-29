import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CookieConsentService } from './services/cookie-consent.service';
import { CookieConsentComponent } from './components/cookies/cookie-consent/cookie-consent.component'
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieConsentComponent]
})
export class AppComponent implements OnInit{
    title = 'bailaconsara-frontend';

    showConsent: boolean = true;

    constructor(
        private cookieConsentService: CookieConsentService,
        private router: Router
    ){
        //lleva al principio de la página
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit(): void {
        this.cookieConsentService.showConsent$.subscribe(
            value => this.showConsent = value
        )
    }
}
