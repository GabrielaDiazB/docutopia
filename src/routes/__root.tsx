import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@rhinolabs/ui";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<Sidebar.Provider>
			<AppSidebar />
			<Sidebar.Inset>
				<Outlet />
			</Sidebar.Inset>
			<TanStackRouterDevtools />
		</Sidebar.Provider>
	),
});
