import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'advancesettings', 
    pathMatch: 'full', 
  },
  { path: '', component: LayoutComponent},
  { path: '', component: LayoutComponent,children:[
    {
      path:'analytics',loadChildren:()=>import('./view/analytics/analytics.module').then(m=>m.AnalyticsModule)
    },
    {
      path:'upcomingTasks',loadChildren:()=>import('./view/upcoming-tasks/upcoming-tasks.module').then(m=>m.UpcomingTasksModule)
    },
    {
      path:'rawData',loadChildren:()=>import('./view/raw-data/raw-data.module').then(m=>m.RawDataModule)
    },
    {
      path:'leadList',loadChildren:()=>import('./view/lead-list/lead-list.module').then(m=>m.LeadListModule)
    },
    {
      path:'applicationList',loadChildren:()=>import('./view/application-list/application-list.module').then(m=>m.ApplicationListModule)
    },
    {
      path:'chatList',loadChildren:()=>import('./view/chat-list/chat-list.module').then(m=>m.ChatListModule)
    },
    {
      path:'myFollowups',loadChildren:()=>import('./view/my-followups/my-followups.module').then(m=>m.MyFollowupsModule)
    },
    {
      path:'failedLeads',loadChildren:()=>import('./view/failed-leads/failed-leads.module').then(m=>m.FailedLeadsModule)
    },
    {
      path:'bulkActions',loadChildren:()=>import('./view/bulk-actions/bulk-actions.module').then(m=>m.BulkActionsModule)
    },
    {
      path:'whatsAppChat',loadChildren:()=>import('./view/whats-app-chat/whats-app-chat.module').then(m=>m.WhatsAppChatModule)
    },
    {
      path:'marketingCampaign',loadChildren:()=>import('./view/marketing-campaign/marketing-campaign.module').then(m=>m.MarketingCampaignModule)
    },
    {
      path:'ruleEngine',loadChildren:()=>import('./view/rule-engine/rule-engine.module').then(m=>m.RuleEngineModule)
    },
    {
      path:'remarketing',loadChildren:()=>import('./view/remarketing/remarketing.module').then(m=>m.RemarketingModule)
    },
    {
      path:'customReports',loadChildren:()=>import('./view/custom-reports/custom-reports.module').then(m=>m.CustomReportsModule)
    },
    {
      path:'connectedAccounts',loadChildren:()=>import('./view/connected-accounts/connected-accounts.module').then(m=>m.ConnectedAccountsModule)
    },
    {
      path:'settings',loadChildren:()=>import('./view/settings/settings.module').then(m=>m.SettingsModule)
    },
    {
      path:'advancesettings',loadChildren:()=>import('./view/advance-settings/advance-settings.module').then(m=>m.AdvanceSettingsModule)
    }
  ]
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
