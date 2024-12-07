import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

import { Items_config } from "@/frontend/constant/dashboard"

export default function ComponentDashboardConfig(): JSX.Element {
    return <ComponentTemplateDashboard items={Items_config} view_redirect={true} />
}