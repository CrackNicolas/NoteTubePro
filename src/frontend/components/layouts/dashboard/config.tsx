import { Component } from "@/frontend/types/component"

import { ItemsConfig } from "@/frontend/constant/dashboard"

import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

export default function ComponentDashboardConfig(): Component {
    return <ComponentTemplateDashboard items={ItemsConfig} viewRedirect={true} />
}