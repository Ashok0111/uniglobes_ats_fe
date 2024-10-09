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
import { ProfileComponent } from './pages/profile-page/profile/profile.component';
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
import { EditApplicationComponent } from './pages/profile-page/edit-application/edit-application.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EducationalDetailComponent } from './pages/profile-page/education-detail/education-detail.component';
import { ExperienceDetailComponent } from './pages/profile-page/experience-detail/experience-detail.component';
import { ListApplicationsComponent } from './pages/profile-page/list-applications/list-applications.component';
import { ToDoListComponent } from './pages/profile-page/to-do-list/to-do-list.component';

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
    { path: 'my-profile',
        component: ProfilePageComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: 'details', component: ProfileComponent},
            {path: 'view-application/:lead_id', component: EditApplicationComponent},

            {path: 'edu-details', component: EducationalDetailComponent},
            {path: 'exp-details', component: ExperienceDetailComponent},
        ]
    },
    { path: 'my-applications',
        component: ListApplicationsComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: ToDoListComponent},
            {path: 'view-application/:lead_id', component: EditApplicationComponent},
        ]
    },

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
        path: 'admin',
        component: CrmPageComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', component: CContactsComponent},
            {path: 'dashboard', component: CrmComponent},
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
