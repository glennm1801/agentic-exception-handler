import { useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbName = (segment: string) => {
    switch (segment) {
      case 'configuration':
        return 'Configuration';
      case 'workflows':
        return 'Workflows';
      case 'scenarios':
        return 'Scenarios';
      case 'create':
        return 'Create New';
      case 'all':
        return 'All Scenarios';
      case 'templates':
        return 'Templates';
      case 'recent':
        return 'Recent';
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    }
  };

  if (pathSegments.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Home className="h-4 w-4" />
        <span className="text-workflow-primary font-medium">Home</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Home className="h-4 w-4" />
      <span className="hover:text-workflow-primary cursor-pointer">Home</span>
      {pathSegments.map((segment, index) => (
        <div key={segment} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <span 
            className={`${
              index === pathSegments.length - 1 
                ? 'text-workflow-primary font-medium' 
                : 'hover:text-workflow-primary cursor-pointer'
            }`}
          >
            {getBreadcrumbName(segment)}
          </span>
        </div>
      ))}
    </div>
  );
}