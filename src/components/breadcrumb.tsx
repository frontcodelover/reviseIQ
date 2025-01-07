import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { fetchFolderName } from '@/services/folderService'; // Assurez-vous que le chemin est correct

const BreadcrumbDashboard = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [folderName, setFolderName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      if (pathnames.length > 0) {
        const lastSegment = pathnames[pathnames.length - 1];
        if (lastSegment.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
          const name = await fetchFolderName(lastSegment);
          setFolderName(name);
        }
      }
    };

    fetchName();
  }, [pathnames]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayValue = isLast && folderName ? folderName : value;

          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                <BreadcrumbLink href={to} className="capitalize">
                  {displayValue}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDashboard;