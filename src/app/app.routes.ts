import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './forms/wizard/wizard.component';
import { EditorsComponent } from './forms/editors/editors.component';
import { FileUploaderComponent } from './forms/file-uploader/file-uploader.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CCreateDealComponent } from './pages/crm-page/c-create-deal/c-create-deal.component';
import { CDealsComponent } from './pages/crm-page/c-deals/c-deals.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { CEditLeadComponent } from './pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateLeadComponent } from './pages/crm-page/c-create-lead/c-create-lead.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { CEditContactComponent } from './pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateContactComponent } from './pages/crm-page/c-create-contact/c-create-contact.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'sign-up', component: SignUpComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password/:uid/:token', component: ResetPasswordComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
    {path: 'my-profile', component: MyProfileComponent},
    {
        path: 'settings',
        component: SettingsComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'connections', component: ConnectionsComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'terms-conditions', component: TermsConditionsComponent}
        ]
    },
    {
        path: 'leads',
        component: CrmPageComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: CContactsComponent},
            {path: 'dashboard', component: CrmComponent},
            {path: 'create-contact', component: CCreateContactComponent},
            {path: 'edit-contact', component: CEditContactComponent},
            {path: 'customers', component: CCustomersComponent},
            {path: 'create-lead', component: CCreateLeadComponent},
            {path: 'edit-lead', component: CEditLeadComponent},
            {path: 'leads', component: CLeadsComponent},
            {path: 'deals', component: CDealsComponent},
            {path: 'create-deal', component: CCreateDealComponent}
        ]
    },
    {
        path: 'forms',
        component: FormsComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: BasicElementsComponent},
            {path: 'advanced-elements', component: AdvancedElementsComponent},
            {path: 'wizard', component: WizardComponent},
            {path: 'editors', component: EditorsComponent},
            {path: 'file-uploader', component: FileUploaderComponent},
        ]
    },
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];
