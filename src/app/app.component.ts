import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbToast
} from '@ng-bootstrap/ng-bootstrap';
import {FaIconComponent, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {Oauth2AuthService} from './auth/oauth2-auth.service';
import {AuthModalComponent} from './auth/auth-modal/auth-modal.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {ToastService} from './shared/toast/toast.service';

@Component({
  selector: 'wac-root',
  standalone: true,
  imports: [RouterOutlet, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionBody, NgbAccordionCollapse, NgbAccordionButton, FaIconComponent, AuthModalComponent, NavbarComponent, NgbToast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'whatsapp-clone-front';

  private faIconLibrary = inject(FaIconLibrary);
  private oauth2Service = inject(Oauth2AuthService);
   toastService = inject(ToastService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.initAuthentication();
  }

  private initAuthentication(): void {
    this.oauth2Service.initAuthentication();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }
}
