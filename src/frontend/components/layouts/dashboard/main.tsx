import { Component } from "@/frontend/types/component"

import { PropsItemsDashboard } from "@/frontend/types/props"

import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

interface IDashboardMain {
    items: PropsItemsDashboard[] 
}

export default function ComponentDashboardMain({ items }: IDashboardMain): Component {
    return <ComponentTemplateDashboard items={items} />
}