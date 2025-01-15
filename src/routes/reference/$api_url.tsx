import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { mockApiData } from "@/mocks/api-data";
import { Badge } from "@rhino-ui/ui";
import { PathParams } from "@/components/response/path-params";
import { QueryParams } from "@/components/response/query-params";
import { BodyParams } from "@/components/response/body-params";
import { ResponseTypes } from "@/components/response/response";

export const Route = createFileRoute("/reference/$api_url")({
	component: RouteComponent,
	loader: async () => {
		const data = mockApiData;
		return { data };
	},
});

function RouteComponent() {
	const { data } = useLoaderData({ from: "/reference/$api_url" });
	return (
		<>
			<div className="container pt-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="head">
							<h1 className="text-2xl font-semibold mb-2">{data.name}</h1>
							<div className="text-sm text-muted-foreground overflow-x-scroll">
								<Badge className="mr-3 font-normal">{data.requestType}</Badge>
								{data.url}
							</div>
						</div>
						<div className="content">
							{data.pathParams && data.pathParams.length > 0 && (
								<PathParams pathParams={mockApiData.pathParams} />
							)}

							{data.queryParams && data.queryParams.length > 0 && (
								<QueryParams />
							)}

							{data.bodyParams && data.bodyParams.length > 0 && <BodyParams />}

							{data.response && data.response.length > 0 && (
								<ResponseTypes responses={data.response} />
							)}
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="sidebar bg-gray-100 p-4 rounded-md">
							<h2 className="text-xl font-semibold">Content</h2>
							<p>
								This is the sidebar content. It will take up 1/3 of the width on
								desktop.
							</p>
							<button className="mt-4 p-2 bg-blue-500 text-white rounded">
								Copy Content
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
