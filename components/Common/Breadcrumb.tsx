import React from "react";

interface Path {
	active: boolean;
	name: string;
	link: string;
}

interface BreadcrumbProps {
	paths: Path[];
}

function Breadcrumb({ paths }: BreadcrumbProps) {
	return (
		<div className="breadcrumb">
			<div className="container-fluid">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb py-2 nomargin">
						{paths.map((path, index) => {
							return (
								<li
									className={`breadcrumb-item py-2 ${
										path.active ? "active" : ""
									}`}
									key={index}
									aria-current={path.active ? "page" : "false"}
								>
									{path.active ? (
										path.name
									) : (
										<a href={path.link}>{path.name}</a>
									)}
								</li>
							);
						})}
					</ol>
				</nav>
			</div>
		</div>
	);
}

export default Breadcrumb;
